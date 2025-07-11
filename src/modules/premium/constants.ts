export const TIER_LIMITS = {
  free: {
    agents: 3,
    meetings: 5,
  },
  starter: {
    agents: -1, // unlimited
    meetings: 30, // per month
  },
  pro: {
    agents: -1, // unlimited
    meetings: -1, // unlimited
  },
  enterprise: {
    agents: -1, // unlimited
    meetings: -1, // unlimited
  },
} as const;

export type SubscriptionTier = keyof typeof TIER_LIMITS;
