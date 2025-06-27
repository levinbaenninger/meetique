import { ResponsiveDialog } from '@/components/responsive-dialog';
import type { Agent } from '@/modules/agents/types';
import { AgentsForm } from '@/modules/agents/ui/components/agents-form';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: Agent;
}

export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: Props) => {
  return (
    <ResponsiveDialog
      title='Update Agent'
      description='Update the agent details.'
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
