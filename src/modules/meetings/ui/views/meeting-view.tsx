'use client';

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useConfirm } from '@/hooks/use-confirm';
import { ActiveState } from '@/modules/meetings/ui/components/active-state';
import { CancelledState } from '@/modules/meetings/ui/components/cancelled-state';
import { MeetingHeader } from '@/modules/meetings/ui/components/meeting-header';
import { ProcessingState } from '@/modules/meetings/ui/components/processing-state';
import { UpcomingState } from '@/modules/meetings/ui/components/upcoming-state';
import { UpdateMeetingDialog } from '@/modules/meetings/ui/components/update-meeting-dialog';
import { useTRPC } from '@/utils/trpc';

interface Props {
  meetingId: string;
}

export const MeetingView = ({ meetingId }: Props) => {
  const router = useRouter();
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { data: meeting } = useSuspenseQuery(
    trpc.meetings.get.queryOptions({ id: meetingId }),
  );

  const [RemoveConfirmDialog, confirmRemove] = useConfirm(
    'Are you absolutely sure?',
    `This action cannot be undone. This will permanently delete this meeting.`,
    'Delete Meeting',
  );

  const removeMeeting = useMutation(
    trpc.meetings.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.list.queryOptions({}));
        router.push('/meetings');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const handleRemove = async () => {
    const confirmed = await confirmRemove();
    if (!confirmed) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isUpcoming = meeting.status === 'upcoming';
  const isActive = meeting.status === 'active';
  const isCompleted = meeting.status === 'completed';
  const isProcessing = meeting.status === 'processing';
  const isCancelled = meeting.status === 'cancelled';

  return (
    <>
      <RemoveConfirmDialog />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={meeting}
      />
      <div className='flex flex-1 flex-col gap-y-4 p-4 md:px-8'>
        <MeetingHeader
          meetingName={meeting.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemove}
        />
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancel={() => {}}
            isCancelling={false}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isCompleted && <div>Completed</div>}
        {isProcessing && <ProcessingState />}
        {isCancelled && <CancelledState />}
      </div>
    </>
  );
};

export const MeetingViewLoading = () => (
  <LoadingState
    title='Loading meeting'
    description='This may take a few seconds.'
  />
);

export const MeetingViewError = () => {
  return (
    <ErrorState
      title='Error loading meeting'
      description='Please try again later.'
    />
  );
};
