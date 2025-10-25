import { useRouter } from "next/navigation";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingsForm } from "@/modules/meetings/ui/components/meetings-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({ open, onOpenChange }: Props) => {
  const router = useRouter();

  return (
    <ResponsiveDialog
      description="Create a new meeting."
      onOpenChange={onOpenChange}
      open={open}
      title="New Meeting"
    >
      <MeetingsForm
        onCancel={() => onOpenChange(false)}
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
      />
    </ResponsiveDialog>
  );
};
