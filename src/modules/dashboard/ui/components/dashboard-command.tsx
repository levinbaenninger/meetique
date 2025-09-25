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

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const trpc = useTRPC();

  const { data: meetings } = useQuery(
    trpc.meetings.list.queryOptions({
      search: debouncedSearch,
      limit: 100,
    }),
  );

  const { data: agents } = useQuery(
    trpc.agents.list.queryOptions({
      search: debouncedSearch,
      limit: 100,
    }),
  );

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
              No meetings found.
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
              No agents found.
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
