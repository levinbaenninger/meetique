import { polarClient } from "@/lib/polar";
import {
  checkAgentLimit,
  checkMeetingChatMessageLimit,
  checkMeetingLimit,
  getTierInfo,
} from "@/modules/premium/utils";
import protectedProcedure from "@/trpc/procedures/protected";
import { router } from "@/trpc/trpc";

export const premiumRouter = router({
  getFreeUsage: protectedProcedure.query(async ({ ctx }) => {
    const tierInfo = await getTierInfo(ctx.session.user.id);

    const [meetingLimit, agentLimit, meetingChatMessageLimit] =
      await Promise.all([
        checkMeetingLimit(ctx.session.user.id, tierInfo),
        checkAgentLimit(ctx.session.user.id, tierInfo),
        checkMeetingChatMessageLimit(ctx.session.user.id, tierInfo),
      ]);

    return {
      agentCount: agentLimit.current,
      meetingCount: meetingLimit.current,
      meetingChatMessageCount: meetingChatMessageLimit.current,
      tier: tierInfo.tier,
      limits: tierInfo.limits,
    };
  }),
  getSubscriptions: protectedProcedure.query(async () => {
    const products = await polarClient.products.list({
      isArchived: false,
      isRecurring: true,
      sorting: ["price_amount"],
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

    return await polarClient.products.get({
      id: subscription.productId,
    });
  }),
  getTierInfo: protectedProcedure.query(
    async ({ ctx }) => await getTierInfo(ctx.session.user.id)
  ),
});
