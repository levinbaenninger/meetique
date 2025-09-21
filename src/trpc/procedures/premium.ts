import { TRPCError } from '@trpc/server';

import { PREMIUM_ENTITY } from '@/modules/premium/constants';
import {
  checkAgentLimit,
  checkMeetingChatMessageLimit,
  checkMeetingLimit,
} from '@/modules/premium/utils';

import protectedProcedure from './protected';

const premiumProcedure = (entity: PREMIUM_ENTITY) =>
  protectedProcedure.use(async ({ ctx, next }) => {
    if (entity === PREMIUM_ENTITY.MEETING) {
      const meetingLimit = await checkMeetingLimit(ctx.session.user.id);

      if (!meetingLimit.allowed) {
        const message = `You have reached your monthly meeting limit of ${meetingLimit.limit}.`;

        throw new TRPCError({
          code: 'FORBIDDEN',
          message,
        });
      }
    }

    if (entity === PREMIUM_ENTITY.AGENT) {
      const agentLimit = await checkAgentLimit(ctx.session.user.id);

      if (!agentLimit.allowed) {
        const message = `You have reached your agent limit of ${agentLimit.limit}.`;

        throw new TRPCError({
          code: 'FORBIDDEN',
          message,
        });
      }
    }

    if (entity === PREMIUM_ENTITY.MEETING_CHAT_MESSAGE) {
      const meetingChatMessageLimit = await checkMeetingChatMessageLimit(
        ctx.session.user.id,
      );

      if (!meetingChatMessageLimit.allowed) {
        const message = `You have reached your limit of ${meetingChatMessageLimit.limit} messages for your meeting chats.`;

        throw new TRPCError({
          code: 'FORBIDDEN',
          message,
        });
      }
    }

    return next({ ctx });
  });

export default premiumProcedure;
