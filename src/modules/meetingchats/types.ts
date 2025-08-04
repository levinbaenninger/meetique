import type { inferRouterOutputs } from '@trpc/server';

import type { appRouter } from '@/trpc/routers/_app';

export type MeetingChat = NonNullable<
  inferRouterOutputs<typeof appRouter>['meetings']['chats']['getChats'][0]
>;

export interface MeetingChatUserMessage {
  id: string;
  meetingChatId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    image: string;
  } | null;
}

export interface MeetingChatAgentMessage {
  id: string;
  meetingChatId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  agent: {
    id: string;
    name: string;
    image: string;
  } | null;
}

export type Meeting = NonNullable<
  inferRouterOutputs<typeof appRouter>['meetings']['get']
>;

export interface BaseMessage {
  author: {
    name: string;
    type: 'user' | 'agent';
    isCurrentUser: boolean;
    image: string;
  };
  date: Date;
  message: string;
}
