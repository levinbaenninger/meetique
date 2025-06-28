import type { inferRouterOutputs } from '@trpc/server';

import type { appRouter } from '@/trpc/routers/_app';

export type Meeting = NonNullable<
  inferRouterOutputs<typeof appRouter>['meetings']['get']
>;
