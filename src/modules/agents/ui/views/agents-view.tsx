'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/modules/agents/ui/components/columns';
import { useTRPC } from '@/utils/trpc';

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data: agents } = useSuspenseQuery(trpc.agents.list.queryOptions());

  return (
    <div className='flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8'>
      <DataTable data={agents} columns={columns} />
      {agents.length === 0 && (
        <EmptyState
          title='Create your first agent'
          description='Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call.'
        />
      )}
    </div>
  );
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
