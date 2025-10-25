import { agentsRouter } from "@/modules/agents/server/procedures";
import { authRouter } from "@/modules/auth/server/procedures";
import { meetingsRouter } from "@/modules/meetings/server/procedures";
import { premiumRouter } from "@/modules/premium/server/procedures";
import { createContext } from "@/trpc/context";
import { createCallerFactory, router } from "@/trpc/trpc";

export const appRouter = router({
  agents: agentsRouter,
  auth: authRouter,
  meetings: meetingsRouter,
  premium: premiumRouter,
});
export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const ctx = await createContext();
  return createCaller(ctx);
};

export type AppRouter = typeof appRouter;
