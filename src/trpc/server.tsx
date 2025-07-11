import 'server-only';

import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { cache } from 'react';

import { createContext } from '@/trpc/context';
import { makeQueryClient } from '@/trpc/query-client';
import { appRouter, createAsyncCaller } from '@/trpc/routers/_app';

export const getQueryClient = cache(makeQueryClient);
export const caller = createAsyncCaller();

export const trpc = createTRPCOptionsProxy({
  ctx: createContext,
  router: appRouter,
  queryClient: getQueryClient,
});
