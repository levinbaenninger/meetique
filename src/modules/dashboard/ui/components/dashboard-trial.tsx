import { useQuery } from '@tanstack/react-query';
import { RocketIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useTRPC } from '@/lib/trpc';
import {
  MAX_FREE_AGENTS,
  MAX_FREE_MEETINGS,
} from '@/modules/premium/constants';

export const DashboardTrial = () => {
  const trpc = useTRPC();
  const { data: freeUsage } = useQuery(
    trpc.premium.getFreeUsage.queryOptions(),
  );

  if (!freeUsage) return null;

  return (
    <div className='border-border/10 flex w-full flex-col gap-y-2 rounded-lg border bg-white/5'>
      <div className='flex flex-col gap-y-4 p-3'>
        <div className='flex items-center gap-2'>
          <RocketIcon className='size-4' />
          <p className='text-sm font-medium'>Free Trial</p>
        </div>
        <div className='flex flex-col gap-y-2'>
          <p className='text-xs'>
            {freeUsage.agentCount}/{MAX_FREE_AGENTS} Agents
          </p>
          <Progress value={(freeUsage.agentCount / MAX_FREE_AGENTS) * 100} />
        </div>
        <div className='flex flex-col gap-y-2'>
          <p className='text-xs'>
            {freeUsage.meetingCount}/{MAX_FREE_MEETINGS} Meetings
          </p>
          <Progress
            value={(freeUsage.meetingCount / MAX_FREE_MEETINGS) * 100}
          />
        </div>
      </div>
      <Button
        asChild
        className='border-border/10 cursor-default rounded-t-none border-t bg-transparent hover:bg-white/10'
      >
        <Link href='/upgrade'>Upgrade</Link>
      </Button>
    </div>
  );
};
