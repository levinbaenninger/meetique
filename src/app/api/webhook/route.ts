import type {
  CallEndedEvent,
  CallRecordingReadyEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
  CallTranscriptionReadyEvent,
} from '@stream-io/node-sdk';
import { and, eq } from 'drizzle-orm';
import { type NextRequest, NextResponse } from 'next/server';

import { db } from '@/db';
import { agent, meeting } from '@/db/schema';
import { inngest } from '@/inngest/client';
import { streamVideo } from '@/lib/stream-video';

const verifySignatureWithSdk = (body: string, signature: string) => {
  return streamVideo.verifyWebhook(body, signature);
};

const extractMeetingIdFromCid = (callCid: string): string | undefined => {
  const parts = callCid.split(':');
  return parts.length > 1 ? parts[1] : undefined;
};

export async function POST(request: NextRequest) {
  const signature = request.headers.get('x-signature');
  const apiKey = request.headers.get('x-api-key');

  if (!signature || !apiKey) {
    return NextResponse.json(
      { error: 'Missing signature or API key.' },
      { status: 400 },
    );
  }

  const body = await request.text();
  if (!verifySignatureWithSdk(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  if (eventType === 'call.session_started') {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Missing meeting ID.' },
        { status: 400 },
      );
    }

    const [existingMeeting] = await db
      .select()
      .from(meeting)
      .where(and(eq(meeting.id, meetingId), eq(meeting.status, 'upcoming')));

    if (!existingMeeting) {
      return NextResponse.json(
        { error: 'Meeting not found.' },
        { status: 404 },
      );
    }

    await db
      .update(meeting)
      .set({
        status: 'active',
        startedAt: new Date(),
      })
      .where(eq(meeting.id, existingMeeting.id));

    const [existingAgent] = await db
      .select()
      .from(agent)
      .where(eq(agent.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json({ error: 'Agent not found.' }, { status: 404 });
    }

    const call = streamVideo.video.call('default', meetingId);
    const realtimeClient = await streamVideo.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPENAI_API_KEY!,
      agentUserId: existingAgent.id,
    });

    realtimeClient.updateSession({
      instructions: existingAgent.instructions,
    });
  } else if (eventType === 'call.session_participant_left') {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = extractMeetingIdFromCid(event.call_cid);

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Missing meeting ID.' },
        { status: 400 },
      );
    }

    const call = streamVideo.video.call('default', meetingId);
    await call.end();
  } else if (eventType === 'call.session_ended') {
    const event = payload as CallEndedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Missing meeting ID.' },
        { status: 400 },
      );
    }

    await db
      .update(meeting)
      .set({
        status: 'processing',
        endedAt: new Date(),
      })
      .where(eq(meeting.id, meetingId));
  } else if (eventType === 'call.transcription_ready') {
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = extractMeetingIdFromCid(event.call_cid);

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Missing meeting ID.' },
        { status: 400 },
      );
    }

    const [updatedMeeting] = await db
      .update(meeting)
      .set({
        transcriptUrl: event.call_transcription.url,
      })
      .where(eq(meeting.id, meetingId))
      .returning();

    if (!updatedMeeting) {
      return NextResponse.json(
        { error: 'Meeting not found.' },
        { status: 404 },
      );
    }

    await inngest.send({
      name: 'meetings/processing',
      data: {
        meetingId: updatedMeeting.id,
        transcriptUrl: updatedMeeting.transcriptUrl,
      },
    });
  } else if (eventType === 'call.recording_ready') {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(':')[1];

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Missing meeting ID.' },
        { status: 400 },
      );
    }

    await db
      .update(meeting)
      .set({
        recordingUrl: event.call_recording.url,
      })
      .where(eq(meeting.id, meetingId));
  }

  return NextResponse.json({ message: 'OK.' });
}
