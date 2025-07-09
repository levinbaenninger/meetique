import { TRPCError } from '@trpc/server';
import { count, eq } from 'drizzle-orm';

import { db } from '@/db';
import { agent, meeting } from '@/db/schema';
import { polarClient } from '@/lib/polar';
import {
  MAX_FREE_AGENTS,
  MAX_FREE_MEETINGS,
} from '@/modules/premium/constants';

import protectedProcedure from './protected';

const premiumProcedure = (entity: 'agent' | 'meeting') =>
  protectedProcedure.use(async ({ ctx, next }) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.session.user.id,
    });

    const isPremium = customer.activeSubscriptions.length > 0;

    if (entity === 'meeting') {
      const [userMeetings] = await db
        .select({ count: count(meeting.id) })
        .from(meeting)
        .where(eq(meeting.userId, ctx.session.user.id));

      const isFreeMeetingLimitReached = userMeetings.count >= MAX_FREE_MEETINGS;
      const shouldThrowMeetingError = isFreeMeetingLimitReached && !isPremium;

      if (shouldThrowMeetingError) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You have reached the free meeting limit.',
        });
      }
    }

    if (entity === 'agent') {
      const [userAgents] = await db
        .select({ count: count(agent.id) })
        .from(agent)
        .where(eq(agent.userId, ctx.session.user.id));

      const isFreeAgentLimitReached = userAgents.count >= MAX_FREE_AGENTS;
      const shouldThrowAgentError = isFreeAgentLimitReached && !isPremium;

      if (shouldThrowAgentError) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You have reached the free agent limit.',
        });
      }
    }

    return next({ ctx: { ...ctx, customer } });
  });

export default premiumProcedure;
