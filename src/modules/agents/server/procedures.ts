import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, getTableColumns, ilike } from 'drizzle-orm';
import { z } from 'zod';

import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT, MIN_LIMIT } from '@/constants';
import { db } from '@/db';
import { agent, meeting } from '@/db/schema';
import { createAgentSchema, updateAgentSchema } from '@/modules/agents/schemas';
import protectedProcedure from '@/trpc/procedures/protected';
import { router } from '@/trpc/trpc';

export const agentsRouter = router({
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agent),
          meetingCount: count(meeting.id),
        })
        .from(agent)
        .leftJoin(meeting, eq(agent.id, meeting.agentId))
        .where(
          and(eq(agent.id, input.id), eq(agent.userId, ctx.session.user.id)),
        )
        .groupBy(agent.id);

      if (!existingAgent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        });
      }

      return existingAgent;
    }),
  list: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        limit: z.number().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
        search: z.string().nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { page, limit, search } = input;

      const data = await db
        .select({
          ...getTableColumns(agent),
          meetingCount: count(meeting.id),
        })
        .from(agent)
        .leftJoin(meeting, eq(agent.id, meeting.agentId))
        .where(
          and(
            eq(agent.userId, ctx.session.user.id),
            search ? ilike(agent.name, `%${search}%`) : undefined,
          ),
        )
        .groupBy(agent.id)
        .orderBy(desc(agent.createdAt), desc(agent.id))
        .groupBy(agent.id)
        .limit(limit)
        .offset((page - 1) * limit);

      const [total] = await db
        .select({ count: count() })
        .from(agent)
        .where(
          and(
            eq(agent.userId, ctx.session.user.id),
            search ? ilike(agent.name, `%${search}%`) : undefined,
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
    .input(createAgentSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agent)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();

      return createdAgent;
    }),
  update: protectedProcedure
    .input(updateAgentSchema)
    .mutation(async ({ input, ctx }) => {
      const [updatedAgent] = await db
        .update(agent)
        .set(input)
        .where(
          and(eq(agent.id, input.id), eq(agent.userId, ctx.session.user.id)),
        )
        .returning();

      if (!updatedAgent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        });
      }

      return updatedAgent;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const [deletedAgent] = await db
        .delete(agent)
        .where(
          and(eq(agent.id, input.id), eq(agent.userId, ctx.session.user.id)),
        )
        .returning();

      if (!deletedAgent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        });
      }

      return deletedAgent;
    }),
});
