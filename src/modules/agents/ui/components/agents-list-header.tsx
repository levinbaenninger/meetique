"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { AgentsSearchFilter } from "@/modules/agents/ui/components/agents-search-filter";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterApplied = !!filters.search;

  const onClearFilters = () => setFilters({ search: "", page: DEFAULT_PAGE });

  return (
    <>
      <NewAgentDialog onOpenChange={setIsDialogOpen} open={isDialogOpen} />
      <div className="flex flex-col gap-y-4 p-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 py-1">
            <AgentsSearchFilter />
            {isAnyFilterApplied && (
              <Button onClick={onClearFilters} size="icon" variant="outline">
                <XIcon className="size-4" />
                <span className="sr-only">Clear filters</span>
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
