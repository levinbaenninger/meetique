'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { DataPagination } from '@/components/data-pagination';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { DataTable } from '@/components/ui/data-table';
import { useTRPC } from '@/lib/trpc';
import { useMeetingsFilters } from '@/modules/meetings/hooks/use-meetings-filters';
import { meetingsColumns } from '@/modules/meetings/ui/components/meetings-columns';

export const MeetingsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();

  const trpc = useTRPC();
  const { data: meetings } = useSuspenseQuery(
    trpc.meetings.list.queryOptions({
      ...filters,
    }),
  );

  return (
    <div className='flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8'>
      <DataTable
        columns={meetingsColumns}
        data={meetings.items}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      {meetings.items.length === 0 ? (
        <EmptyState
          title='Create your first meeting'
          description='Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real-time.'
        />
      ) : (
        <DataPagination
          page={filters.page}
          totalPages={meetings.totalPages}
          onPageChange={(page) => setFilters({ ...filters, page })}
        />
      )}
    </div>
  );
};

export const MeetingsViewLoading = () => (
  <LoadingState
    title='Loading meetings'
    description='This may take a few seconds.'
  />
);

export const MeetingsViewError = () => (
  <ErrorState
    title='Error loading meetings'
    description='Please try again later.'
  />
);
