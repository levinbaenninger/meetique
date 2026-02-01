import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";

export const MeetingsSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <div className="relative">
      <Input
        className="h-9 w-[200px] bg-white pl-7"
        onChange={(e) => setFilters({ search: e.target.value })}
        placeholder="Search meetings"
        value={filters.search}
      />
      <SearchIcon className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};
