import { ResponsiveDialog } from "@/components/responsive-dialog";
import type { Agent } from "@/modules/agents/types";
import { AgentsForm } from "@/modules/agents/ui/components/agents-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: Agent;
}

export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: Props) => (
  <ResponsiveDialog
    description="Update the agent details."
    onOpenChange={onOpenChange}
    open={open}
    title="Update Agent"
  >
    <AgentsForm
      initialValues={initialValues}
      onCancel={() => onOpenChange(false)}
      onSuccess={() => onOpenChange(false)}
    />
  </ResponsiveDialog>
);
