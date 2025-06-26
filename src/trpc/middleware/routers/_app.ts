import { createContext } from '../../context';
import { createCallerFactory, mergeRouters } from '../../trpc';
import { helloRouter } from './hello';

export const appRouter = mergeRouters(helloRouter);
export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const ctx = await createContext();
  return createCaller(ctx);
};

export type AppRouter = typeof appRouter;
