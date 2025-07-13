import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { CommandSelect } from '@/components/command-select';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { useTRPC } from '@/lib/trpc';
import { useMeetingsFilters } from '@/modules/meetings/hooks/use-meetings-filters';

export const MeetingsAgentFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [agentSearch, setAgentSearch] = useState('');

  const trpc = useTRPC();
  const { data: agents } = useQuery(
    trpc.agents.list.queryOptions({
      limit: 100,
      search: agentSearch,
    }),
  );

  return (
    <CommandSelect
      className='h-9'
      placeholder='Agent'
      options={(agents?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className='flex items-center gap-x-2'>
            <GeneratedAvatar
              seed={agent.name}
              variant='botttsNeutral'
              className='size-4'
            />
            {agent.name}
          </div>
        ),
      }))}
      onSelect={(value) => setFilters({ agentId: value as string })}
      onSearch={setAgentSearch}
      value={filters.agentId ?? ''}
    />
  );
};
