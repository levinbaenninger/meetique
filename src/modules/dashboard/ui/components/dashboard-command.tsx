import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useRouter } from 'next/navigation';
import { type Dispatch, type SetStateAction, useState } from 'react';

import { GeneratedAvatar } from '@/components/generated-avatar';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from '@/components/ui/command';
import { useTRPC } from '@/lib/trpc';

import { DEBOUNCE_MS } from '../../constants';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search.trim(), DEBOUNCE_MS);

  const trpc = useTRPC();

  const { data: meetings, isFetching: isFetchingMeetings } = useQuery({
    ...trpc.meetings.list.queryOptions({
      search: debouncedSearch,
      limit: 100,
    }),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: debouncedSearch.length > 0,
  });

  const { data: agents, isFetching: isFetchingAgents } = useQuery({
    ...trpc.agents.list.queryOptions({
      search: debouncedSearch,
      limit: 100,
    }),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: debouncedSearch.length > 0,
  });

  return (
    <CommandResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title='Dashboard'
      description='Find a meeting or agent...'
      shouldFilter={false}
    >
      <CommandInput
        placeholder='Find a meeting or agent...'
        value={search}
        onValueChange={(value) => setSearch(value)}
      />
      <CommandList>
        <CommandGroup heading='Meetings'>
          <CommandEmpty>
            <span className='text-muted-foreground text-sm'>
              {isFetchingMeetings ? 'Searching…' : 'No meetings found.'}{' '}
            </span>
          </CommandEmpty>
          {meetings?.items.map((meeting) => (
            <CommandItem
              key={meeting.id}
              onSelect={() => {
                router.push(`/meetings/${meeting.id}`);
                setOpen(false);
              }}
            >
              {meeting.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading='Agents'>
          <CommandEmpty>
            <span className='text-muted-foreground text-sm'>
              {isFetchingAgents ? 'Searching…' : 'No agents found.'}{' '}
            </span>
          </CommandEmpty>
          {agents?.items.map((agent) => (
            <CommandItem
              key={agent.id}
              onSelect={() => {
                router.push(`/agents/${agent.id}`);
                setOpen(false);
              }}
            >
              <GeneratedAvatar
                seed={agent.name}
                variant='botttsNeutral'
                className='size-4'
              />
              {agent.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
