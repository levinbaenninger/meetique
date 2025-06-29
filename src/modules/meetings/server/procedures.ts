import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm';
import { z } from 'zod';

import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT, MIN_LIMIT } from '@/constants';
import { db } from '@/db';
import { agent, meeting } from '@/db/schema';
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
});
