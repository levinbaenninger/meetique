import { ResponsiveDialog } from "@/components/responsive-dialog";
import type { Meeting } from "@/modules/meetings/types";
import { MeetingsForm } from "@/modules/meetings/ui/components/meetings-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: Meeting;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: Props) => (
  <ResponsiveDialog
    description="Update the meeting details."
    onOpenChange={onOpenChange}
    open={open}
    title="Update Meeting"
  >
    <MeetingsForm
      initialValues={initialValues}
      onCancel={() => onOpenChange(false)}
      onSuccess={() => onOpenChange(false)}
    />
  </ResponsiveDialog>
);
