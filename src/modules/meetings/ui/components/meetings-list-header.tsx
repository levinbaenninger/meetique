'use client';

import { PlusIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DEFAULT_PAGE } from '@/constants';
import { useMeetingsFilters } from '@/modules/meetings/hooks/use-meetings-filters';
import { MeetingsAgentFilter } from '@/modules/meetings/ui/components/meetings-agent-filter';
import { MeetingsSearchFilter } from '@/modules/meetings/ui/components/meetings-search-filter';
import { MeetingsStatusFilter } from '@/modules/meetings/ui/components/meetings-status-filter';
import { NewMeetingDialog } from '@/modules/meetings/ui/components/new-meeting-dialog';

export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterApplied =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () =>
    setFilters({
      search: '',
      page: DEFAULT_PAGE,
      status: null,
      agentId: '',
    });

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className='flex flex-col gap-y-4 p-4 md:px-8'>
        <div className='flex items-center justify-between'>
          <h5 className='text-xl font-medium'>My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className='flex items-center gap-x-2 py-1'>
            <MeetingsSearchFilter />
            <MeetingsStatusFilter />
            <MeetingsAgentFilter />
            {isAnyFilterApplied && (
              <Button variant='outline' size='icon' onClick={onClearFilters}>
                <XIcon className='size-4' />
                <span className='sr-only'>Clear filters</span>
              </Button>
            )}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </>
  );
};
