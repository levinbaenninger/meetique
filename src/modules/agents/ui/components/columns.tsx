'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CornerDownRightIcon, VideoIcon } from 'lucide-react';

import { GeneratedAvatar } from '@/components/generated-avatar';
import { Badge } from '@/components/ui/badge';
import type { Agent } from '@/modules/agents/types';

export const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: 'name',
    header: 'Agent Name',
    cell: ({ row }) => (
      <div className='flex flex-col gap-y-1'>
        <div className='flex items-center gap-x-2'>
          <GeneratedAvatar
            variant='botttsNeutral'
            seed={row.original.name}
            className='size-6'
          />
          <span className='text-sm font-semibold capitalize'>
            {row.original.name}
          </span>
        </div>
        <div className='flex items-center gap-x-1.5'>
          <CornerDownRightIcon className='text-muted-foreground size-3' />
          <span className='text-muted-foreground max-w-200 truncate text-xs'>
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'meetingCount',
    header: 'Meetings',
    cell: () => (
      <Badge
        variant='outline'
        className='ml-auto flex items-center gap-x-2 [&svg]:size-4'
      >
        <VideoIcon className='text-primary' />5 Meetings
      </Badge>
    ),
  },
];
