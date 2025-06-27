'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { VideoIcon } from 'lucide-react';

import { ErrorState } from '@/components/error-state';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { LoadingState } from '@/components/loading-state';
import { Badge } from '@/components/ui/badge';
import { useTRPC } from '@/utils/trpc';

import { AgentHeader } from '../components/agent-header';

interface Props {
  agentId: string;
}

export const AgentView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data: agent } = useSuspenseQuery(
    trpc.agents.get.queryOptions({ id: agentId }),
  );

  return (
    <div className='flex flex-1 flex-col gap-y-4 p-4 md:px-8'>
      <AgentHeader
        agentName={agent.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <div className='rounded-lg border bg-white'>
        <div className='col-span-5 flex flex-col gap-y-5 px-4 py-5'>
          <div className='flex items-center gap-x-3'>
            <GeneratedAvatar
              variant='botttsNeutral'
              seed={agent.name}
              className='size-10'
            />
            <h2 className='text-2xl font-medium'>{agent.name}</h2>
          </div>
          <Badge
            variant='outline'
            className='flex items-center gap-x-2 [&_svg]:size-4'
          >
            <VideoIcon className='text-primary' />
            {agent.meetingCount}{' '}
            {agent.meetingCount === 1 ? 'Meeting' : 'Meetings'}
          </Badge>
          <div className='flex flex-col gap-x-4'>
            <p className='text-lg font-medium'>Instructions</p>
            <p className='text-muted-foreground text-sm'>
              {agent.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AgentViewLoading = () => (
  <LoadingState
    title='Loading agent'
    description='This may take a few seconds.'
  />
);

export const AgentViewError = () => (
  <ErrorState
    title='Error loading agent'
    description='Please try again later or contact support if the problem persists.'
  />
);
