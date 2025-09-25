import { createAgent, openai, type TextMessage } from '@inngest/agent-kit';
import { eq, inArray } from 'drizzle-orm';
import JSONL from 'jsonl-parse-stringify';

import { db } from '@/db';
import { agent, meeting, user } from '@/db/schema';
import { env } from '@/env';
import { Transcript } from '@/modules/meetings/types';

import { inngest } from './client';

const summarizer = createAgent({
  name: 'Summarizer',
  system:
    `You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

  Use the following markdown structure for every output:

  ### Overview
  Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

  ### Notes
  Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

  Example:
  #### Section Name
  - Main point or demo shown here
  - Another key insight or interaction
  - Follow-up tool or explanation provided

  #### Next Section
  - Feature X automatically does Y
  - Mention of integration with Z`.trim(),
  model: openai({ model: 'gpt-4o', apiKey: env.OPENAI_API_KEY }),
});

export const meetingsProcessing = inngest.createFunction(
  { id: 'meetings/processing' },
  { event: 'meetings/processing' },
  async ({ event, step }) => {
    const response = await step.run('fetch-transcript', async () => {
      try {
        const res = await fetch(event.data.transcriptUrl);
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
    });

    const transcript = await step.run('parse-transcript', async () => {
      return JSONL.parse<Transcript>(response);
    });

    const transcriptWithSpeaker = await step.run('add-speakers', async () => {
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
    });

    const { output } = await summarizer.run(
      `Summarize the following meeting transcript: ${JSON.stringify(transcriptWithSpeaker)}`,
    );

    await step.run('save-summary', async () => {
      await db
        .update(meeting)
        .set({
          summary: (output[0] as TextMessage).content as string,
          status: 'completed',
        })
        .where(eq(meeting.id, event.data.meetingId));
    });

    return {
      summary: output,
    };
  },
);
