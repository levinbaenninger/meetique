import type { inferRouterOutputs } from '@trpc/server';

import type { appRouter } from '@/trpc/routers/_app';

export type MeetingChat = NonNullable<
  inferRouterOutputs<typeof appRouter>['meetings']['chats']['getChats'][0]
>;

interface BaseMeetingChatMessage {
  id: string;
  meetingChatId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingChatUserMessage extends BaseMeetingChatMessage {
  user: {
    id: string;
    name: string;
    image: string;
  } | null;
}

export interface MeetingChatAgentMessage extends BaseMeetingChatMessage {
  agent: {
    id: string;
    name: string;
    image: string;
  } | null;
}

export type Meeting = NonNullable<
  inferRouterOutputs<typeof appRouter>['meetings']['get']
>;

export enum AuthorType {
  USER,
  AGENT,
}

export interface BaseMessage {
  author: {
    name: string;
    type: AuthorType;
    isCurrentUser: boolean;
    image: string;
  };
  date: Date;
  message: string;
}
