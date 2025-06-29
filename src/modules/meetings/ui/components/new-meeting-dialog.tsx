import { useRouter } from 'next/navigation';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { MeetingsForm } from '@/modules/meetings/ui/components/meetings-form';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({ open, onOpenChange }: Props) => {
  const router = useRouter();

  return (
    <ResponsiveDialog
      title='New Meeting'
      description='Create a new meeting.'
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingsForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
