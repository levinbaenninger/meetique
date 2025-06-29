import type { inferRouterOutputs } from '@trpc/server';

import type { appRouter } from '@/trpc/routers/_app';

export type Meeting = NonNullable<
  inferRouterOutputs<typeof appRouter>['meetings']['get']
>;
export const meetingStatus = [
  'upcoming',
  'active',
  'completed',
  'processing',
  'cancelled',
] as const;
