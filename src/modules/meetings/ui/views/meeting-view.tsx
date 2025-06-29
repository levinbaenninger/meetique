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
import { MeetingHeader } from '@/modules/meetings/ui/components/meeting-header';
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
