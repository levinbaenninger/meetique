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

  const userSpeakers = await db
    .select()
    .from(user)
    .where(inArray(user.id, speakerIds))
    .then((users) =>
      users.map((user) => ({
        ...user,
      })),
    );

  const agentSpeakers = await db
    .select()
    .from(agent)
    .where(inArray(agent.id, speakerIds))
    .then((agents) =>
      agents.map((agent) => ({
        ...agent,
      })),
    );

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
