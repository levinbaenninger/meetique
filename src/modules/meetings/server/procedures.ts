import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm';
import { z } from 'zod';

import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT, MIN_LIMIT } from '@/constants';
import { db } from '@/db';
import { agent, meeting } from '@/db/schema';
import { generateAvatarUri } from '@/lib/avatar';
import { streamVideo } from '@/lib/stream-video';
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
          code: 'NOT_FOUND',
          message: 'Agent not found or not accessible.',
        });
      }

      const [createdMeeting] = await db
        .insert(meeting)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();

      const call = streamVideo.video.call('default', createdMeeting.id);

      await call.create({
        data: {
          created_by_id: ctx.session.user.id,
          custom: {
            meetingId: createdMeeting.id,
            meetingName: createdMeeting.name,
          },
          settings_override: {
            transcription: {
              language: 'en',
              mode: 'auto-on',
              closed_caption_mode: 'auto-on',
            },
            recording: {
              mode: 'auto-on',
              quality: '1080p',
            },
          },
        },
      });

      await streamVideo.upsertUsers([
        {
          id: existingAgent.id,
          name: existingAgent.name,
          image: generateAvatarUri({
            seed: existingAgent.name,
            variant: 'botttsNeutral',
          }),
          role: 'user',
        },
      ]);

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
          code: 'NOT_FOUND',
          message: 'Agent not found or not accessible.',
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
  generateToken: protectedProcedure.mutation(async ({ ctx }) => {
    await streamVideo.upsertUsers([
      {
        id: ctx.session.user.id,
        name: ctx.session.user.name,
        image:
          ctx.session.user.image ??
          generateAvatarUri({
            seed: ctx.session.user.name,
            variant: 'initials',
          }),
        role: 'admin',
      },
    ]);

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamVideo.generateUserToken({
      user_id: ctx.session.user.id,
      exp: expirationTime,
      validity_in_seconds: issuedAt,
    });

    return token;
  }),
});
