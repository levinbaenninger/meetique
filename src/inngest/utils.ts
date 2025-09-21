import { gemini, openai } from '@inngest/agent-kit';
import { inArray } from 'drizzle-orm';
import JSONL from 'jsonl-parse-stringify';

import { db } from '@/db';
import { agent, user } from '@/db/schema';
import { Transcript } from '@/modules/meetings/types';

export function getFunctionModel() {
  return process.env.OPENAI_API_KEY
    ? openai({
        model: 'gpt-4o',
        apiKey: process.env.OPENAI_API_KEY!,
      })
    : gemini({
        model: 'gemini-2.0-flash',
        apiKey: process.env.GEMINI_API_KEY!,
      });
}

export async function fetchTranscript(transcriptUrl: string) {
  try {
    const res = await fetch(transcriptUrl);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch transcript: ${res.status} ${res.statusText}`,
      );
    }
    return await res.text();
  } catch (error) {
    throw new Error(
      `Failed to fetch transcript: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

export async function parseTranscript(transcriptionResponse: string) {
  return JSONL.parse<Transcript>(transcriptionResponse);
}

export async function addSpeakersToTranscript(transcript: Transcript[]) {
  const speakerIds = [...new Set(transcript.map((t) => t.speaker_id))];

  const [userSpeakers, agentSpeakers] = await Promise.all([
    db.select().from(user).where(inArray(user.id, speakerIds)),
    db.select().from(agent).where(inArray(agent.id, speakerIds)),
  ]);

  const speakers = [...userSpeakers, ...agentSpeakers];

  return transcript.map((t) => {
    const speaker = speakers.find((s) => s.id === t.speaker_id);

    if (!speaker) {
      return {
        ...t,
        user: {
          name: 'Unknown',
        },
      };
    }

    return {
      ...t,
      user: {
        name: speaker.name,
      },
    };
  });
}

export function addTimesInSecondsToTranscript(transcript: Transcript[]) {
  return transcript.map((transcript) => ({
    type: transcript.type,
    text: transcript.text,
    start_time_seconds: millisecondsToString(transcript.start_ts),
    stop_time_seconds: millisecondsToString(transcript.stop_ts),
  }));
}

function millisecondsToString(milliseconds: number) {
  // 6100069ms
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
