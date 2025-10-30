import { generateAvatarUri } from "@/lib/avatar";
import type {
  BaseMessage,
  MeetingChatAgentMessage,
  MeetingChatUserMessage,
} from "@/modules/meetingchats/types";

export function mergeMessagesIntoBaseMessages(
  userMessages: MeetingChatUserMessage[],
  agentMessages: MeetingChatAgentMessage[],
  userId: string
): BaseMessage[] {
  const messages = [] as BaseMessage[];

  for (const userMessage of userMessages) {
    messages.push({
      author: {
        name: userMessage.user?.name ?? "?",
        type: "user",
        isCurrentUser: userMessage.user?.id === userId,
        image:
          userMessage.user?.image ??
          generateAvatarUri({
            seed: userMessage.user?.name ?? "?", // deleted
            variant: "initials",
          }),
      },
      message: userMessage.message,
      date: userMessage.createdAt,
    });
  }

  for (const agentMessage of agentMessages) {
    messages.push({
      author: {
        name: agentMessage.agent?.name ?? "?",
        type: "agent",
        isCurrentUser: false,
        image:
          agentMessage.agent?.image ??
          generateAvatarUri({
            seed: agentMessage.agent?.name ?? "?", // deleted
            variant: "initials",
          }),
      },
      message: agentMessage.message,
      date: agentMessage.createdAt,
    });
  }

  messages.sort((a, b) => a.date.getTime() - b.date.getTime());

  return messages;
}
