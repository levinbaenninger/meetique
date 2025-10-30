"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { DataPagination } from "@/components/data-pagination";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { DataTable } from "@/components/ui/data-table";
import { useTRPC } from "@/lib/trpc";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { agentsColumns } from "@/modules/agents/ui/components/agents-columns";

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();

  const trpc = useTRPC();
  const { data: agents } = useSuspenseQuery(
    trpc.agents.list.queryOptions({ ...filters })
  );

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable
        columns={agentsColumns}
        data={agents.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      {agents.items.length === 0 ? (
        <EmptyState
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
          title="Create your first agent"
        />
      ) : (
        <DataPagination
          onPageChange={(page) => setFilters({ ...filters, page })}
          page={filters.page}
          totalPages={agents.totalPages}
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => (
  <LoadingState
    description="This may take a few seconds."
    title="Loading agents"
  />
);

export const AgentsViewError = () => (
  <ErrorState
    description="Please try again later."
    title="Error loading agents"
  />
);
