import { TRPCError } from '@trpc/server';

import {
  checkAgentLimit,
  checkMeetingChatMessageLimit,
  checkMeetingLimit,
} from '@/modules/premium/utils';

import protectedProcedure from './protected';

const premiumProcedure = (entity: 'agent' | 'meeting' | 'meetingChatMessage') =>
  protectedProcedure.use(async ({ ctx, next }) => {
    if (entity === 'meeting') {
      const meetingLimit = await checkMeetingLimit(ctx.session.user.id);

      if (!meetingLimit.allowed) {
        const message = `You have reached your monthly meeting limit of ${meetingLimit.limit}.`;

        throw new TRPCError({
          code: 'FORBIDDEN',
          message,
        });
      }
    }

    if (entity === 'agent') {
      const agentLimit = await checkAgentLimit(ctx.session.user.id);

      if (!agentLimit.allowed) {
        const message = `You have reached your agent limit of ${agentLimit.limit}.`;

        throw new TRPCError({
          code: 'FORBIDDEN',
          message,
        });
      }
    }

    if (entity === 'meetingChatMessage') {
      const meetingChatMessageLimit = await checkMeetingChatMessageLimit(
        ctx.session.user.id,
      );

      if (!meetingChatMessageLimit.allowed) {
        const message = `You have reached your message limit of ${meetingChatMessageLimit.limit} for your meeting chats.`;

        throw new TRPCError({
          code: 'FORBIDDEN',
          message,
        });
      }
    }

    return next({ ctx });
  });

export default premiumProcedure;
