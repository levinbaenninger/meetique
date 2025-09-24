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
import { useTRPC } from '@/lib/trpc';
import { ActiveState } from '@/modules/meetings/ui/components/active-state';
import { CancelledState } from '@/modules/meetings/ui/components/cancelled-state';
import { CompletedState } from '@/modules/meetings/ui/components/completed-state';
import { MeetingHeader } from '@/modules/meetings/ui/components/meeting-header';
import { ProcessingState } from '@/modules/meetings/ui/components/processing-state';
import { UpcomingState } from '@/modules/meetings/ui/components/upcoming-state';
import { UpdateMeetingDialog } from '@/modules/meetings/ui/components/update-meeting-dialog';

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

  const [CancelConfirmDialog, confirmCancel] = useConfirm(
    'Are you absolutely sure?',
    `This action cannot be undone. This will permanently cancel this meeting.`,
    'Cancel Meeting',
  );
  const [isCancelling, setIsCancelling] = useState(false);

  const removeMeeting = useMutation(
    trpc.meetings.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.list.queryOptions({}),
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions(),
        );
        router.push('/meetings');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const cancelMeeting = useMutation(
    trpc.meetings.cancel.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.list.queryOptions({}),
        );
        router.refresh();
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

  const handleCancel = async () => {
    const confirmed = await confirmCancel();
    if (!confirmed) return;

    setIsCancelling(true);
    await cancelMeeting.mutateAsync({ id: meetingId });
  };

  const isUpcoming = meeting.status === 'upcoming';
  const isActive = meeting.status === 'active';
  const isCompleted = meeting.status === 'completed';
  const isProcessing = meeting.status === 'processing';
  const isCancelled = meeting.status === 'cancelled';

  return (
    <>
      <RemoveConfirmDialog />
      <CancelConfirmDialog />
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
            onCancel={handleCancel}
            isCancelling={isCancelling}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isCompleted && <CompletedState meeting={meeting} />}
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
