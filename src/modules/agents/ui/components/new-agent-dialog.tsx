import { ResponsiveDialog } from '@/components/responsive-dialog';
import { AgentsForm } from '@/modules/agents/ui/components/agents-form';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentDialog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDialog
      title='New Agent'
      description='Create a new agent.'
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
