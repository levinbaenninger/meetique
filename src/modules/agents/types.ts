import type { inferRouterOutputs } from "@trpc/server";

import type { appRouter } from "@/trpc/routers/_app";

export type Agent = NonNullable<
  inferRouterOutputs<typeof appRouter>["agents"]["get"]
>;
