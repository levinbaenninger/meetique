import { inferRouterOutputs } from '@trpc/server';

import { appRouter } from '@/trpc/routers/_app';

export type Agent = NonNullable<
  inferRouterOutputs<typeof appRouter>['agents']['get']
>;
