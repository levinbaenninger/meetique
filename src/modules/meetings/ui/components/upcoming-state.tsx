import { BanIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link';

import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';

interface Props {
  meetingId: string;
  onCancel: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({ meetingId, onCancel, isCancelling }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5'>
      <EmptyState
        image='/upcoming.svg'
        title='Not started yet'
        description='Once you start this meeting, you will be able to see the details here.'
      />
      <div className='flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center'>
        <Button
          variant='secondary'
          className='w-full lg:w-auto'
          onClick={onCancel}
          disabled={isCancelling}
        >
          <BanIcon />
          Cancel Meeting
        </Button>
        <Button
          asChild
          className='w-full cursor-default lg:w-auto'
          disabled={isCancelling}
        >
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
