'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { DataPagination } from '@/components/data-pagination';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { DataTable } from '@/components/ui/data-table';
import { useTRPC } from '@/lib/trpc';
import { useAgentsFilters } from '@/modules/agents/hooks/use-agents-filters';
import { agentsColumns } from '@/modules/agents/ui/components/agents-columns';

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();

  const trpc = useTRPC();
  const { data: agents } = useSuspenseQuery(
    trpc.agents.list.queryOptions({ ...filters }),
  );

  return (
    <div className='flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8'>
      <DataTable
        data={agents.items}
        columns={agentsColumns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      {agents.items.length === 0 ? (
        <EmptyState
          title='Create your first agent'
          description='Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call.'
        />
      ) : (
        <DataPagination
          page={filters.page}
          totalPages={agents.totalPages}
          onPageChange={(page) => setFilters({ ...filters, page })}
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
    description='Please try again later.'
  />
);
