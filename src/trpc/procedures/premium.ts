import { TRPCError } from "@trpc/server";

import type { PremiumEntity } from "@/modules/premium/constants";
import {
  checkAgentLimit,
  checkMeetingChatMessageLimit,
  checkMeetingLimit,
} from "@/modules/premium/utils";

import protectedProcedure from "./protected";

const premiumProcedure = (entity: PremiumEntity) =>
  protectedProcedure.use(async ({ ctx, next }) => {
    const userId: string = ctx.session.user.id;

    switch (entity) {
      case "agent":
        await assertAgentLimit(userId);
        break;
      case "meeting":
        await assertMeetingLimit(userId);
        break;
      case "meetingChatMessage":
        await assertMeetingChatMessages(userId);
        break;
      default:
        break;
    }

    return next({ ctx });
  });

export default premiumProcedure;

async function assertMeetingLimit(userId: string) {
  const meetingLimit = await checkMeetingLimit(userId);

  if (!meetingLimit.allowed) {
    const message = `You have reached your monthly meeting limit of ${meetingLimit.limit}.`;

    throw new TRPCError({
      code: "FORBIDDEN",
      message,
    });
  }
}

async function assertAgentLimit(userId: string) {
  const agentLimit = await checkAgentLimit(userId);

  if (!agentLimit.allowed) {
    const message = `You have reached your agent limit of ${agentLimit.limit}.`;

    throw new TRPCError({
      code: "FORBIDDEN",
      message,
    });
  }
}

async function assertMeetingChatMessages(userId: string) {
  const meetingChatMessageLimit = await checkMeetingChatMessageLimit(userId);

  if (!meetingChatMessageLimit.allowed) {
    const message = `You have reached your limit of ${meetingChatMessageLimit.limit} messages for your meeting chats.`;

    throw new TRPCError({
      code: "FORBIDDEN",
      message,
    });
  }
}
