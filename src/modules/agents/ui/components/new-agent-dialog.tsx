import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentsForm } from "@/modules/agents/ui/components/agents-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentDialog = ({ open, onOpenChange }: Props) => (
  <ResponsiveDialog
    description="Create a new agent."
    onOpenChange={onOpenChange}
    open={open}
    title="New Agent"
  >
    <AgentsForm
      onCancel={() => onOpenChange(false)}
      onSuccess={() => onOpenChange(false)}
    />
  </ResponsiveDialog>
);
