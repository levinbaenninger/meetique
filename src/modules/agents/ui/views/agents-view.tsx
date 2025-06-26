'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/utils/trpc';

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data: agents } = useSuspenseQuery(trpc.agents.list.queryOptions());

  return <div>{JSON.stringify(agents, null, 2)}</div>;
};

export const AgentsViewLoading = () => (
  <LoadingState
    title='Loading agents'
    description='This may take a few seconds.'
  />
);

export const AgentsViewError = () => (
  <ErrorState
    title='Error loading agents'
    description='Please try again later or contact support if the problem persists.'
  />
);
