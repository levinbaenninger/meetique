import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";

import { CommandSelect } from "@/components/command-select";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";
import { type MeetingStatus, meetingStatus } from "@/modules/meetings/types";

const options = meetingStatus.map((status) => ({
  id: status,
  value: status,
  children: (
    <div className="flex items-center gap-x-2 capitalize">
      {(() => {
        switch (status) {
          case "upcoming":
            return <ClockArrowUpIcon />;
          case "active":
            return <VideoIcon />;
          case "completed":
            return <CircleCheckIcon />;
          case "processing":
            return <LoaderIcon />;
          case "cancelled":
            return <CircleXIcon />;
          default:
            return null;
        }
      })()}
      {`${status.charAt(0).toUpperCase()}${status.slice(1)}`}
    </div>
  ),
}));

export const MeetingsStatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <CommandSelect
      className="h-9"
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      options={options}
      placeholder="Status"
      value={filters.status ?? ""}
    />
  );
};
