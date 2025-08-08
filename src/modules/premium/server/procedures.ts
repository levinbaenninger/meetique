import { count, eq, sum } from 'drizzle-orm';

import { db } from '@/db';
import { agent, meeting, meeting_chat } from '@/db/schema';
import { polarClient } from '@/lib/polar';
import { getTierInfo } from '@/modules/premium/utils';
import protectedProcedure from '@/trpc/procedures/protected';
import { router } from '@/trpc/trpc';

export const premiumRouter = router({
  getFreeUsage: protectedProcedure.query(async ({ ctx }) => {
    const tierInfo = await getTierInfo(ctx.session.user.id);

    const [userMeetings] = await db
      .select({ count: count(meeting.id) })
      .from(meeting)
      .where(eq(meeting.userId, ctx.session.user.id));

    const [userAgents] = await db
      .select({ count: count(agent.id) })
      .from(agent)
      .where(eq(agent.userId, ctx.session.user.id));

    const [userMeetingChatMessages] = await db
      .select({ count: sum(meeting_chat.messageCount) })
      .from(meeting_chat)
      .where(eq(meeting_chat.createdByUserId, ctx.session.user.id));

    return {
      agentCount: userAgents.count,
      meetingCount: userMeetings.count,
      meetingChatMessagesCount: userMeetingChatMessages.count
        ? parseInt(userMeetingChatMessages.count)
        : 0,
      tier: tierInfo.tier,
      limits: tierInfo.limits,
    };
  }),
  getSubscriptions: protectedProcedure.query(async () => {
    const products = await polarClient.products.list({
      isArchived: false,
      isRecurring: true,
      sorting: ['price_amount'],
    });

    return products.result.items;
  }),
  getCurrentSubscription: protectedProcedure.query(async ({ ctx }) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.session.user.id,
    });

    const subscription = customer.activeSubscriptions[0];

    if (!subscription) {
      return null;
    }

    const product = await polarClient.products.get({
      id: subscription.productId,
    });

    return product;
  }),
  getTierInfo: protectedProcedure.query(async ({ ctx }) => {
    return await getTierInfo(ctx.session.user.id);
  }),
});
