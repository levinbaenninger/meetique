import { generateAvatarUri } from '@/lib/avatar';
import {
  AuthorType,
  BaseMessage,
  MeetingChatAgentMessage,
  MeetingChatUserMessage,
} from '@/modules/meetingchats/types';

export function mergeMessagesIntoBaseMessages(
  userMessages: Array<MeetingChatUserMessage>,
  agentMessages: Array<MeetingChatAgentMessage>,
  userId: string,
): Array<BaseMessage> {
  const messages = [] as Array<BaseMessage>;

  userMessages?.forEach((message: MeetingChatUserMessage) =>
    messages.push({
      author: {
        name: message.user?.name ?? '?',
        type: AuthorType.USER,
        isCurrentUser: message.user?.id === userId,
        image:
          message.user?.image ??
          generateAvatarUri({
            seed: message.user?.name ?? '?', // deleted
            variant: 'initials',
          }),
      },
      message: message.message,
      date: message.createdAt!,
    }),
  );

  agentMessages?.forEach((message: MeetingChatAgentMessage) =>
    messages.push({
      author: {
        name: message.agent?.name ?? '?',
        type: AuthorType.AGENT,
        isCurrentUser: false,
        image:
          message.agent?.image ??
          generateAvatarUri({
            seed: message.agent?.name ?? '?', // deleted
            variant: 'initials',
          }),
      },
      message: message.message,
      date: message.createdAt,
    }),
  );

  messages.sort((a, b) => a.date.getTime() - b.date.getTime());

  return messages;
}
