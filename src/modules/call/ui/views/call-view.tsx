'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { CallProvider } from '@/modules/call/ui/components/call-provider';
import { useTRPC } from '@/utils/trpc';

interface Props {
  meetingId: string;
}

export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data: meeting } = useSuspenseQuery(
    trpc.meetings.get.queryOptions({ id: meetingId }),
  );

  if (meeting.status === 'completed') {
    return (
      <div className='flex h-screen items-center justify-center'>
        <ErrorState
          title='Meeting has ended'
          description='You can no longer join this meeting.'
        />
      </div>
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={meeting.name} />;
};

export const CallViewLoading = () => (
  <LoadingState
    title='Loading call'
    description='This may take a few seconds.'
  />
);

export const CallViewError = () => (
  <ErrorState
    title='Error loading call'
    description='Please try again later.'
  />
);
