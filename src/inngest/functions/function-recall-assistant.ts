import { createAgent } from '@inngest/agent-kit';

import {
  addSpeakersToTranscript,
  fetchTranscript,
  getFunctionModel,
  parseTranscript,
} from '@/inngest/functions/utils';

import { inngest } from '../client';

const meetingRecallAssistant = createAgent({
  name: 'Recall Assistant',
  system: `You are an AI assistant designed to answer questions about a past meeting. Your primary goal is to provide concise, accurate, and helpful answers about the meeting.
  
  Instructions:
  1.  **Answer Directly:** Provide a direct and concise answer to the User's Question.
  2.  **Prioritize Transcript:** For questions specifically about the meeting, always refer *first and foremost* to the provided Meeting Transcript.
  3.  **Use General Knowledge Sparingly:** If the question is not about the meeting itself (e.g., a general knowledge question, a definition, or a request for "other information you know"), you may use your broader general knowledge from your training data to answer. But say that explicitly, e.g., "Based on my general knowledge, ...".
  4.  **Handle Unanswerable Questions (Transcript):** If a question *about the meeting* cannot be found in the transcript, state: "I cannot find the answer to this question in the provided meeting transcript."
  5.  **Handle Unanswerable Questions (General Knowledge):** If a general question is outside your capabilities, state: "I'm sorry, I don't have information on that topic."
  6.  **Attribute Speakers (Meeting Info):** If quoting or referencing specific points from the meeting transcript, mention the speaker, e.g., "John said..." or "According to Sarah, ...".
  `,
  model: getFunctionModel(),
});
export const meetingsChat = inngest.createFunction(
  { id: 'meetings/chat' },
  { event: 'meetings/chat' },
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

    const { output } = await meetingRecallAssistant.run(
      `Respond to this user message: ${event.data.message}.
      
      Use the following transcript as an information source while responding:
      ${JSON.stringify(transcriptWithSpeaker)}`,
    );

    return {
      agentMessage: output,
    };
  },
);
