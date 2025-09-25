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
  const hasDebouncedSearch = debouncedSearch.length > 0;

  const trpc = useTRPC();

  const { data: meetings } = useQuery({
    ...trpc.meetings.list.queryOptions({
      search: debouncedSearch,
      limit: 100,
    }),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  const { data: agents } = useQuery({
    ...trpc.agents.list.queryOptions({
      search: debouncedSearch,
      limit: 100,
    }),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
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
        <CommandEmpty>
          {hasDebouncedSearch
            ? 'No results found.'
            : 'No meetings or agents available.'}
        </CommandEmpty>
        {meetings?.items && meetings.items.length > 0 && (
          <CommandGroup heading='Meetings'>
            {meetings.items.map((meeting) => (
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
        )}
        {agents?.items && agents.items.length > 0 && (
          <CommandGroup heading='Agents'>
            {agents.items.map((agent) => (
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
        )}
      </CommandList>
    </CommandResponsiveDialog>
  );
};
