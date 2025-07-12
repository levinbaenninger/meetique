import { TRPCError } from '@trpc/server';
import { and, desc, eq, getTableColumns } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import {
  meeting,
  meeting_chat,
  meeting_chat_message_agent,
  meeting_chat_message_user,
} from '@/db/schema';
import protectedProcedure from '@/trpc/procedures/protected';
import { router } from '@/trpc/trpc';

export const meetingChatsRouter = router({
  getChat: protectedProcedure
    .input(z.object({ meeting_id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [meetingChat] = await db
        .select({
          ...getTableColumns(meeting_chat),
        })
        .from(meeting_chat)
        .where(
          and(
            eq(meeting.userId, ctx.session.user.id),
            eq(meeting_chat.meetingId, input.meeting_id),
          ),
        )
        .limit(1);

      if (!meetingChat) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No meetingchat of meeting found',
        });
      }

      return meetingChat;
    }),
  getUserMessages: protectedProcedure
    .input(
      z.object({
        meeting_chat_id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // ToDo: implement pagination for meetingchat messages
      const { meeting_chat_id } = input;

      const [foundMeeting] = await db
        .select({
          id: meeting.id,
          userId: meeting.userId,
        })
        .from(meeting)
        .where(
          and(
            eq(meeting.id, meeting_chat_id),
            eq(meeting.userId, ctx.session.user.id),
          ),
        );

      if (!foundMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found or access denied',
        });
      }

      const [userMessages] = await db
        .select({
          ...getTableColumns(meeting_chat_message_user),
        })
        .from(meeting_chat_message_user)
        .where(
          and(eq(meeting_chat_message_user.meetingChatId, meeting_chat_id)),
        )
        .orderBy(desc(meeting_chat_message_user.createdAt));

      return userMessages;
    }),
  getAgentMessages: protectedProcedure
    .input(
      z.object({
        meeting_chat_id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // ToDo: implement pagination for meetingchat messages
      const { meeting_chat_id } = input;

      const [foundMeeting] = await db
        .select({
          id: meeting.id,
          userId: meeting.userId,
        })
        .from(meeting)
        .where(
          and(
            eq(meeting.id, meeting_chat_id),
            eq(meeting.userId, ctx.session.user.id),
          ),
        );

      if (!foundMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found or access denied',
        });
      }

      const [agentMessages] = await db
        .select({
          ...getTableColumns(meeting_chat_message_agent),
        })
        .from(meeting_chat_message_agent)
        .where(
          and(eq(meeting_chat_message_agent.meetingChatId, meeting_chat_id)),
        )
        .orderBy(desc(meeting_chat_message_agent.createdAt));

      return agentMessages;
    }),
});
