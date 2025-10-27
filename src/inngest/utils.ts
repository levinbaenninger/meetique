import { gemini, openai } from '@inngest/agent-kit';
import { inArray } from 'drizzle-orm';
import JSONL from 'jsonl-parse-stringify';

import { db } from '@/db';
import { agent, user } from '@/db/schema';
import {
  FetchedTranscript,
  FormattedTranscript,
  Speaker,
} from '@/modules/meetings/types';

export function getFunctionModel() {
  if (process.env.OPENAI_API_KEY) {
    return openai({
      model: 'gpt-4o',
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  if (process.env.GEMINI_API_KEY) {
    return gemini({
      model: 'gemini-2.0-flash',
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
  throw new Error(
    'No AI provider configured: set OPENAI_API_KEY and, optionally, GEMINI_API_KEY',
  );
}

export async function fetchFormattedTranscript(
  transcriptUrl: string,
): Promise<FormattedTranscript[]> {
  const fetched = await fetchTranscript(transcriptUrl);

  const speakerMap = await getSpeakers(
    fetched.map((transcript) => transcript.speaker_id),
  );

  return fetched.map((transcript) => ({
    speaker: speakerMap.get(transcript.speaker_id) ?? null,
    type: transcript.type,
    text: transcript.text,
    start_time_formatted: millisecondsToFormattedTime(transcript.start_ts),
    stop_time_formatted: millisecondsToFormattedTime(transcript.stop_ts),
  }));
}

async function fetchTranscript(
  transcriptUrl: string,
): Promise<FetchedTranscript[]> {
  try {
    assertAllowedUrl(transcriptUrl);

    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), 10_000);
    const result = await fetch(transcriptUrl, {
      signal: abortController.signal,
    });
    clearTimeout(timeout);

    if (!result.ok) {
      throw new Error(
        `Failed to fetch transcript: ${result.status} ${result.statusText}`,
      );
    }

    return await parseTranscript(await result.text());
  } catch (error) {
    throw new Error(
      `Failed to fetch transcript: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

function assertAllowedUrl(
  urlString: string,
  allowedHosts: string[] = (process.env.ALLOWED_TRANSCRIPT_HOSTS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
): void {
  const url = new URL(urlString);
  if (url.protocol !== 'https:') {
    throw new Error('Only https:// is allowed for transcript URLs');
  }
  if (allowedHosts.length && !allowedHosts.includes(url.hostname)) {
    throw new Error(`Host ${url.hostname} is not allowed`);
  }
}

async function parseTranscript(
  transcriptionResponse: string,
): Promise<FetchedTranscript[]> {
  return JSONL.parse<FetchedTranscript>(transcriptionResponse) ?? [];
}

async function getSpeakers(
  speakerIds: string[],
): Promise<Map<string, Speaker>> {
  const [userSpeakers, agentSpeakers] = await Promise.all([
    db.select().from(user).where(inArray(user.id, speakerIds)),
    db.select().from(agent).where(inArray(agent.id, speakerIds)),
  ]);
  const speakers: Speaker[] = [...userSpeakers, ...agentSpeakers];

  const speakerMap: Map<string, Speaker> = new Map<string, Speaker>();
  speakers.forEach((speaker) => speakerMap.set(speaker.id, speaker));
  return speakerMap;
}

function millisecondsToFormattedTime(milliseconds: number): string {
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
