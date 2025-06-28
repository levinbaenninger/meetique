import type { Dispatch, SetStateAction } from 'react';

import {
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from '@/components/ui/command';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title='Dashboard'
      description='Find a meeting or agent...'
    >
      <CommandInput placeholder='Find a meeting or agent...' />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
