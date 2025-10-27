import { createAgent, TextMessage } from '@inngest/agent-kit';

import { db } from '@/db';
import { meeting_chat_message_agent } from '@/db/schema';
import { fetchFormattedTranscript,getFunctionModel } from '@/inngest/utils';
import { FormattedTranscript } from '@/modules/meetings/types';

import { inngest } from '../client';

const defaultSystemPrompt =
  `You are a cutting-edge AI assistant specifically designed for meeting post-processing. Your primary task is to provide users with precise and context-aware answers based on meeting information, flexibly responding to their questions and requests.
  
  Always respond to the last user message (latest_user_message). 
  Take into account the entire chat history (chat_history) to maintain context and continuity in your responses.

    **Your core functions and behaviors are:**
    
    - **Information Source:** Your primary information source is the provided meeting transcript (**meeting_transcript**). You use it to answer direct questions, create summaries, and facilitate discussions.
    - **Contextual Understanding:** You understand the context of the meeting and the user's questions based on the provided meeting transcript (**meeting_transcript**) and the chat history (**chat_history**).
    - **Language Adaptation:** Always write in the language of the last user message (**latest_user_message**). If the user writes in English, you respond in English; if they write in Spanish, you respond in Spanish, and so on.
    - **Attribution:** When using information from the meeting transcript, you always mention the participant who made the corresponding statement (e.g., "According to Sarah..." or "John said...").
    - **Handling Missing Information:** If information is not found in the meeting transcript, you clearly and explicitly inform the user (e.g., "Unfortunately, this topic was not mentioned in the meeting transcript." or "This information is not available in the transcript.").
    - **General Questions:** You also answer more general questions that are not directly from the meeting transcript. In such cases, you make it clear that the answer does not originate directly from the meeting (e.g., "This is general information and not directly from the meeting transcript." or "Please note this is general knowledge, not from the meeting.").
    - **Discussion:** You are not just a Q&A system but can also lead discussions about the meeting content and related topics and help the user delve deeper into specific points.
    - **Clarity and Precision:** Your answers are always clear, precise, and easy to understand. Avoid unnecessary jargon.
    - **Flexibility:** You are flexible in interpreting user requests and always strive to provide the best possible answer, even if the question is not perfectly formulated.
    `.trim();

const chatBotAssistant = createAgent({
  name: 'Chat Bot Assistant',
  system: defaultSystemPrompt,
  model: getFunctionModel(),
});

export const functionGenerateAgentMessage = inngest.createFunction(
  { id: 'meetings/generate-agent-message' },
  { event: 'meetings/generate-agent-message' },
  async ({ event, step }) => {
    const { transcriptUrl, meetingChatId, agentId, chatMessages, lastMessage } =
      event.data;

    const transcript: FormattedTranscript[] = await step.run(
      'generate-agent-message/fetch-formatted-transcript',
      async () => fetchFormattedTranscript(transcriptUrl),
    );

    const { output } = await chatBotAssistant.run(
      JSON.stringify({
        meeting_transcript: transcript,
        chat_history: chatMessages,
        latest_user_message: lastMessage,
      }),
    );

    let agentMessage = '';

    if (!output || output.length === 0 || !(output[0] as TextMessage).content) {
      agentMessage =
        "I'm sorry, I couldn't generate a message for you. Please try again.";
    } else {
      agentMessage = (output[0] as TextMessage).content as string;
    }

    await step.run(
      'generate-agent-message/save-agent-chat-message',
      async () => {
        try {
          await db
            .insert(meeting_chat_message_agent)
            .values({
              meetingChatId: meetingChatId,
              agentId: agentId,
              message: agentMessage,
            })
            .returning();
        } catch (error) {
          throw new Error(
            `Failed to save agent message: ${error instanceof Error ? error.message : 'Unknown error'}`,
          );
        }
      },
    );

    return output;
  },
);
