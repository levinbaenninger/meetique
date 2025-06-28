import { agentsRouter } from '@/modules/agents/server/procedures';
import { createContext } from '@/trpc/context';
import { createCallerFactory, router } from '@/trpc/trpc';

export const appRouter = router({
  agents: agentsRouter,
});
export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const ctx = await createContext();
  return createCaller(ctx);
};

export type AppRouter = typeof appRouter;
