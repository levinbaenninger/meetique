import { createAgent, type TextMessage } from '@inngest/agent-kit';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { meeting } from '@/db/schema';
import {
  addSpeakersToTranscript,
  fetchTranscript,
  getFunctionModel,
  parseTranscript,
} from '@/inngest/functions/utils';

import { inngest } from '../client';

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
  model: getFunctionModel(),
});

export const meetingsProcessing = inngest.createFunction(
  { id: 'meetings/processing' },
  { event: 'meetings/processing' },
  async ({ event, step }) => {
    const response = await step.run('fetch-transcript', async () =>
      fetchTranscript(event.data.transcriptUrl),
    );

    const transcript = await step.run('parse-transcript', async () =>
      parseTranscript(response),
    );

    const transcriptWithSpeaker = await step.run('add-speakers', async () =>
      addSpeakersToTranscript(transcript),
    );

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
