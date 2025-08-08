import { TRPCError } from '@trpc/server';
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import {
  agent,
  meeting,
  meeting_chat,
  meeting_chat_message_agent,
  meeting_chat_message_user,
  user,
} from '@/db/schema';
import { inngest } from '@/inngest/client';
import { generateAvatarUri } from '@/lib/avatar';
import { mergeMessagesIntoBaseMessages } from '@/modules/meetingchats/messageUtils';
import {
  createChatSchema,
  createChatUserMessageSchema,
  generateChatAgentMessageSchema,
} from '@/modules/meetingchats/schemas';
import {
  MeetingChatAgentMessage,
  MeetingChatUserMessage,
} from '@/modules/meetingchats/types';
import premiumProcedure from '@/trpc/procedures/premium';
import protectedProcedure from '@/trpc/procedures/protected';
import { router } from '@/trpc/trpc';
import { hasUserMeetingAccess, hasUserMeetingChatAccess } from '@/utils/access';

export const meetingChatsRouter = router({
  getChats: protectedProcedure
    .input(z.object({ meetingId: z.string() }))
    .query(async ({ input, ctx }) => {
      const meetingChats = await db
        .select({
          ...getTableColumns(meeting_chat),
        })
        .from(meeting_chat)
        .where(
          and(
            eq(meeting_chat.createdByUserId, ctx.session.user.id),
            eq(meeting_chat.meetingId, input.meetingId),
          ),
        );

      if (meetingChats === null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No chat of this meeting found or access denied',
        });
      }

      return meetingChats;
    }),
  getUserMessages: protectedProcedure
    .input(
      z.object({
        meetingChatId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (!input.meetingChatId) {
        return [];
      }

      if (
        !(await hasUserMeetingChatAccess(
          ctx.session.user.id,
          input.meetingChatId,
        ))
      ) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found or access denied',
        });
      }

      return getUserMessages(input.meetingChatId);
    }),
  getAgentMessages: protectedProcedure
    .input(
      z.object({
        meetingChatId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (!input.meetingChatId) {
        return [];
      }

      if (
        !(await hasUserMeetingChatAccess(
          ctx.session.user.id,
          input.meetingChatId,
        ))
      ) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found or access denied',
        });
      }

      return getAgentMessages(input.meetingChatId);
    }),
  getMessages: protectedProcedure
    .input(z.object({ meetingChatId: z.string() }))
    .query(async ({ input, ctx }) => {
      // ToDo: implement pagination for meetingchat messages

      if (!input.meetingChatId) {
        return [];
      }

      if (
        !(await hasUserMeetingChatAccess(
          ctx.session.user.id,
          input.meetingChatId,
        ))
      ) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found or access denied',
        });
      }

      return getMessages(input.meetingChatId, ctx.session.user.id);
    }),
  createChat: protectedProcedure
    .input(createChatSchema)
    .mutation(async ({ input, ctx }) => {
      if (!(await hasUserMeetingAccess(ctx.session.user.id, input.meetingId))) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found or access denied',
        });
      }

      const [createdChat] = await db
        .insert(meeting_chat)
        .values({
          ...input,
          createdByUserId: ctx.session.user.id,
        })
        .returning();

      return createdChat;
    }),
  createUserMessage: premiumProcedure('meetingChatMessage')
    .input(createChatUserMessageSchema)
    .mutation(async ({ input, ctx }) => {
      if (
        !(await hasUserMeetingChatAccess(
          ctx.session.user.id,
          input.meetingChatId,
        ))
      ) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting chat not found or access denied',
        });
      }

      const [createdUserMessage] = await db
        .insert(meeting_chat_message_user)
        .values({
          message: input.message,
          meetingChatId: input.meetingChatId,
          userId: ctx.session.user.id,
        })
        .returning();

      await incrementChatMessageCount(input.meetingChatId);

      return createdUserMessage;
    }),
  generateAgentMessage: premiumProcedure('meetingChatMessage')
    .input(generateChatAgentMessageSchema)
    .mutation(async ({ input, ctx }) => {
      const [meetingChat] = await db
        .select({
          meetingId: meeting_chat.meetingId,
        })
        .from(meeting_chat)
        .where(
          and(
            eq(meeting_chat.id, input.meetingChatId),
            eq(meeting_chat.createdByUserId, ctx.session.user.id),
          ),
        );

      if (!meetingChat) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting chat not found or access denied',
        });
      }

      const [existingMeeting] = await db
        .select({
          ...getTableColumns(meeting),
        })
        .from(meeting)
        .where(
          and(
            eq(meeting.id, meetingChat.meetingId),
            eq(meeting.userId, ctx.session.user.id),
          ),
        );

      const [agentOfMeeting] = await db
        .select({
          id: agent.id,
          name: agent.name,
          instructions: agent.instructions,
        })
        .from(agent)
        .where(eq(agent.id, existingMeeting.agentId));

      if (!existingMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found or access denied',
        });
      }

      const chatMessages = await getMessages(
        input.meetingChatId,
        ctx.session.user.id,
      );

      await inngest.send({
        name: 'meetings/generate-agent-message',
        data: {
          transcriptUrl: existingMeeting.transcriptUrl,
          meetingChatId: input.meetingChatId,
          agentId: existingMeeting.agentId,
          agentInstructions: agentOfMeeting.instructions,
          chatMessages: chatMessages.slice(0, -2),
          lastMessage: chatMessages.at(-1) || '',
        },
      });
    }),
});

async function getMessages(meetingChatId: string, currentUserId: string) {
  const userMessages = await getUserMessages(meetingChatId);
  const agentMessages = await getAgentMessages(meetingChatId);

  return mergeMessagesIntoBaseMessages(
    userMessages,
    agentMessages,
    currentUserId,
  );
}

async function getUserMessages(
  meetingChatId: string,
): Promise<Array<MeetingChatUserMessage>> {
  return await db
    .select({
      ...getTableColumns(meeting_chat_message_user),
      userId: user.id,
      userName: user.name,
      userImage: user.image,
    })
    .from(meeting_chat_message_user)
    .leftJoin(user, eq(user.id, meeting_chat_message_user.userId))
    .where(and(eq(meeting_chat_message_user.meetingChatId, meetingChatId)))
    .orderBy(desc(meeting_chat_message_user.createdAt))
    .then((messages) =>
      messages.map((message) => ({
        ...message,
        user: message.userId
          ? {
              id: message.userId,
              name: message.userName ?? '?',
              image:
                message.userImage ??
                generateAvatarUri({
                  seed: message.userName ?? '?',
                  variant: 'initials',
                }),
            }
          : null,
      })),
    );
}

async function getAgentMessages(
  meetingChatId: string,
): Promise<Array<MeetingChatAgentMessage>> {
  return await db
    .select({
      ...getTableColumns(meeting_chat_message_agent),
      agentId: agent.id,
      agentName: agent.name,
    })
    .from(meeting_chat_message_agent)
    .leftJoin(agent, eq(agent.id, meeting_chat_message_agent.agentId))
    .where(and(eq(meeting_chat_message_agent.meetingChatId, meetingChatId)))
    .orderBy(desc(meeting_chat_message_agent.createdAt))
    .then((messages) =>
      messages.map((message) => ({
        ...message,
        agent: message.agentId
          ? {
              id: message.agentId,
              name: message.agentName ?? '?',
              image: generateAvatarUri({
                seed: message.agentName ?? '?',
                variant: 'botttsNeutral',
              }),
            }
          : null,
      })),
    );
}

export async function incrementChatMessageCount(meetingChatId: string) {
  await db
    .update(meeting_chat)
    .set({
      messageCount: sql`${meeting_chat.messageCount}
      + 1`,
    })
    .where(and(eq(meeting_chat.id, meetingChatId)));
}
