import { and, count, eq, gte, inArray, lte } from 'drizzle-orm';

import { db } from '@/db';
import {
  agent,
  meeting,
  meeting_chat,
  meeting_chat_message_agent,
  meeting_chat_message_user,
} from '@/db/schema';
import { polarClient } from '@/lib/polar';

import { type SubscriptionTier, TIER_LIMITS } from './constants';

export interface CustomerData {
  id: string;
  activeSubscriptions: Array<{
    id: string;
    productId: string;
    status: string;
  }>;
}

export interface TierInfo {
  tier: SubscriptionTier;
  limits: {
    agents: number;
    meetings: number;
    meetingChatMessages: number;
  };
}

export async function getCustomerData(userId: string): Promise<CustomerData> {
  return await polarClient.customers.getStateExternal({
    externalId: userId,
  });
}

export async function determineUserTier(
  customer: CustomerData,
): Promise<SubscriptionTier> {
  if (customer.activeSubscriptions.length === 0) {
    return 'free';
  }

  const subscription = customer.activeSubscriptions[0];

  const product = await polarClient.products.get({
    id: subscription.productId,
  });

  const productName = product.name.toLowerCase();

  if (productName.includes('starter')) {
    return 'starter';
  } else if (productName.includes('pro')) {
    return 'pro';
  } else if (productName.includes('enterprise')) {
    return 'enterprise';
  }

  return 'free';
}

export async function getTierInfo(userId: string): Promise<TierInfo> {
  const customer = await getCustomerData(userId);
  const tier = await determineUserTier(customer);

  return {
    tier,
    limits: TIER_LIMITS[tier],
  };
}

export async function checkAgentLimit(
  userId: string,
): Promise<{ allowed: boolean; current: number; limit: number }> {
  const tierInfo = await getTierInfo(userId);

  if (tierInfo.limits.agents === -1) {
    return { allowed: true, current: 0, limit: -1 };
  }

  const [userAgents] = await db
    .select({ count: count(agent.id) })
    .from(agent)
    .where(eq(agent.userId, userId));

  const allowed = userAgents.count < tierInfo.limits.agents;

  return {
    allowed,
    current: userAgents.count,
    limit: tierInfo.limits.agents,
  };
}

export async function checkMeetingLimit(
  userId: string,
): Promise<{ allowed: boolean; current: number; limit: number }> {
  const tierInfo = await getTierInfo(userId);

  if (tierInfo.limits.meetings === -1) {
    return { allowed: true, current: 0, limit: -1 };
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), (now.getMonth() + 1) % 12, 0);

  const [userMeetings] = await db
    .select({ count: count(meeting.id) })
    .from(meeting)
    .where(
      and(
        eq(meeting.userId, userId),
        gte(meeting.createdAt, startOfMonth),
        lte(meeting.createdAt, endOfMonth),
      ),
    );

  const allowed = userMeetings.count < tierInfo.limits.meetings;

  return {
    allowed,
    current: userMeetings.count,
    limit: tierInfo.limits.meetings,
  };
}

export async function checkMeetingChatMessageLimit(
  userId: string,
): Promise<{ allowed: boolean; current: number; limit: number }> {
  const tierInfo = await getTierInfo(userId);

  if (tierInfo.limits.meetingChatMessages === -1) {
    return { allowed: true, current: 0, limit: -1 };
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), (now.getMonth() + 1) % 12, 0);

  const userChats = await db
    .select({ id: meeting_chat.id })
    .from(meeting_chat)
    .where(and(eq(meeting_chat.createdByUserId, userId)))
    .then((chats) => chats.map((chat) => chat.id));

  const [agentMessages] = await db
    .select({ count: count(meeting_chat_message_agent.id) })
    .from(meeting_chat_message_agent)
    .where(
      and(
        inArray(meeting_chat_message_agent.meetingChatId, userChats),
        gte(meeting_chat_message_agent.createdAt, startOfMonth),
        lte(meeting_chat_message_agent.createdAt, endOfMonth),
      ),
    );

  const [userMessages] = await db
    .select({ count: count(meeting_chat_message_user.id) })
    .from(meeting_chat_message_user)
    .where(
      and(
        inArray(meeting_chat_message_user.meetingChatId, userChats),
        gte(meeting_chat_message_user.createdAt, startOfMonth),
        lte(meeting_chat_message_user.createdAt, endOfMonth),
      ),
    );

  const messageCount = agentMessages.count + userMessages.count;
  const allowed = messageCount < tierInfo.limits.meetingChatMessages;

  return {
    allowed,
    current: messageCount,
    limit: tierInfo.limits.meetingChatMessages,
  };
}
