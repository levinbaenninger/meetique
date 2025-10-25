"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import type { Agent } from "@/modules/agents/types";

export const agentsColumns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            className="size-6"
            seed={row.original.name}
            variant="botttsNeutral"
          />
          <span className="font-semibold text-sm capitalize">
            {row.original.name}
          </span>
        </div>
        <div className="flex items-center gap-x-1.5">
          <CornerDownRightIcon className="size-3 text-muted-foreground" />
          <span className="max-w-[200px] truncate text-muted-foreground text-xs">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        className="ml-auto flex items-center gap-x-2 [&svg]:size-4"
        variant="outline"
      >
        <VideoIcon className="text-primary" />
        {row.original.meetingCount}{" "}
        {row.original.meetingCount === 1 ? "Meeting" : "Meetings"}
      </Badge>
    ),
  },
];
