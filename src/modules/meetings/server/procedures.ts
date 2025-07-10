import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm';
import { z } from 'zod';

import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT, MIN_LIMIT } from '@/constants';
import { db } from '@/db';
import {
  agent,
  meeting,
  meeting_chat,
  meeting_chat_message_agent,
  meeting_chat_message_user,
} from '@/db/schema';
import {
  createMeetingSchema,
  updateMeetingSchema,
} from '@/modules/meetings/schemas';
import { meetingStatus } from '@/modules/meetings/types';
import protectedProcedure from '@/trpc/procedures/protected';
import { router } from '@/trpc/trpc';

export const meetingsRouter = router({
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingMeeting] = await db
        .select({
          ...getTableColumns(meeting),
          agent: agent,
          duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as(
            'duration',
          ),
        })
        .from(meeting)
        .innerJoin(agent, eq(meeting.agentId, agent.id))
        .where(
          and(
            eq(meeting.id, input.id),
            eq(meeting.userId, ctx.session.user.id),
          ),
        );

      if (!existingMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }

      return existingMeeting;
    }),
  list: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        limit: z.number().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
        search: z.string().nullish(),
        agentId: z.string().nullish(),
        status: z.enum(meetingStatus).nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { page, limit, search, agentId, status } = input;

      const data = await db
        .select({
          ...getTableColumns(meeting),
          agent: agent,
          duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as(
            'duration',
          ),
        })
        .from(meeting)
        .innerJoin(agent, eq(meeting.agentId, agent.id))
        .where(
          and(
            eq(meeting.userId, ctx.session.user.id),
            search ? ilike(meeting.name, `%${search}%`) : undefined,
            agentId ? eq(meeting.agentId, agentId) : undefined,
            status ? eq(meeting.status, status) : undefined,
          ),
        )
        .orderBy(desc(meeting.createdAt), desc(meeting.id))
        .limit(limit)
        .offset((page - 1) * limit);

      const [total] = await db
        .select({ count: count() })
        .from(meeting)
        .innerJoin(agent, eq(meeting.agentId, agent.id))
        .where(
          and(
            eq(meeting.userId, ctx.session.user.id),
            search ? ilike(meeting.name, `%${search}%`) : undefined,
            agentId ? eq(meeting.agentId, agentId) : undefined,
            status ? eq(meeting.status, status) : undefined,
          ),
        );

      const totalPages = Math.ceil(total.count / limit);

      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),
  create: protectedProcedure
    .input(createMeetingSchema)
    .mutation(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select()
        .from(agent)
        .where(
          and(
            eq(agent.userId, ctx.session.user.id),
            eq(agent.id, input.agentId),
          ),
        );

      if (!existingAgent) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Agent not found.',
        });
      }

      const [createdMeeting] = await db
        .insert(meeting)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();

      return createdMeeting;
    }),
  update: protectedProcedure
    .input(updateMeetingSchema)
    .mutation(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select()
        .from(agent)
        .where(
          and(
            eq(agent.userId, ctx.session.user.id),
            eq(agent.id, input.agentId),
          ),
        );

      if (!existingAgent) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Agent not found.',
        });
      }

      const [updatedMeeting] = await db
        .update(meeting)
        .set(input)
        .where(
          and(
            eq(meeting.id, input.id),
            eq(meeting.userId, ctx.session.user.id),
          ),
        )
        .returning();

      if (!updatedMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }

      return updatedMeeting;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const [deletedMeeting] = await db
        .delete(meeting)
        .where(
          and(
            eq(meeting.id, input.id),
            eq(meeting.userId, ctx.session.user.id),
          ),
        )
        .returning();

      if (!deletedMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }

      return deletedMeeting;
    }),
  getChats: protectedProcedure
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
          message: 'No chat of meeting found',
        });
      }

      return meetingChat;
    }),
  getChatUserMessages: protectedProcedure
    .input(
      z.object({
        meeting_chat_id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // ToDo: implement pagination for chat messages
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
  getChatAgentMessages: protectedProcedure
    .input(
      z.object({
        meeting_chat_id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // ToDo: implement pagination for chat messages
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
