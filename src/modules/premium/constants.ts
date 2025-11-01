export const TIER_LIMITS = {
  free: {
    agents: 3, // overall
    meetings: 5, // overall
    meetingChatMessages: 20, // overall
  },
  starter: {
    agents: -1, // unlimited
    meetings: 30, // per month
    meetingChatMessages: 100, // per month
  },
  pro: {
    agents: -1, // unlimited
    meetings: -1, // unlimited
    meetingChatMessages: 500, // per month
  },
  enterprise: {
    agents: -1, // unlimited
    meetings: -1, // unlimited
    meetingChatMessages: -1, // unlimited
  },
} as const;

export type SubscriptionTier = keyof typeof TIER_LIMITS;

export const premiumEntity = [
  "agent",
  "meeting",
  "meetingChatMessage",
] as const;

export type PremiumEntity = (typeof premiumEntity)[number];
