import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useAgentsFilters } from '@/modules/agents/hooks/use-agents-filters';

export const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();

  return (
    <div className='relative'>
      <Input
        placeholder='Search agents'
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        className='h-9 w-[200px] bg-white pl-7'
      />
      <SearchIcon className='text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2' />
    </div>
  );
};
