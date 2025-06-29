import { ResponsiveDialog } from '@/components/responsive-dialog';
import type { Meeting } from '@/modules/meetings/types';
import { MeetingsForm } from '@/modules/meetings/ui/components/meetings-form';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: Meeting;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: Props) => {
  return (
    <ResponsiveDialog
      title='Update Meeting'
      description='Update the meeting details.'
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
