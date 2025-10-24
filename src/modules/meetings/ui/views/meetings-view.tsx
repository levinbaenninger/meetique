"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { DataPagination } from "@/components/data-pagination";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { DataTable } from "@/components/ui/data-table";
import { useTRPC } from "@/lib/trpc";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";
import { meetingsColumns } from "@/modules/meetings/ui/components/meetings-columns";

export const MeetingsView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useMeetingsFilters();

  const trpc = useTRPC();
  const { data: meetings } = useSuspenseQuery(
    trpc.meetings.list.queryOptions({
      ...filters,
    })
  );

  useEffect(() => {
    if (searchParams.has("agentId")) {
      setFilters({
        agentId: searchParams.get("agentId"),
        page: null,
        search: null,
        status: null,
      });
    }
  }, [searchParams, setFilters]);

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable
        columns={meetingsColumns}
        data={meetings.items}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      {meetings.items.length === 0 ? (
        <EmptyState
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real-time."
          title="Create your first meeting"
        />
      ) : (
        <DataPagination
          onPageChange={(page) => setFilters({ ...filters, page })}
          page={filters.page}
          totalPages={meetings.totalPages}
        />
      )}
    </div>
  );
};

export const MeetingsViewLoading = () => (
  <LoadingState
    description="This may take a few seconds."
    title="Loading meetings"
  />
);

export const MeetingsViewError = () => (
  <ErrorState
    description="Please try again later."
    title="Error loading meetings"
  />
);
