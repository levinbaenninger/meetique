import { JSX, useState } from 'react';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';

export const useConfirm = (
  title: string,
  description: string,
  confirmText?: string,
  cancelText?: string,
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    promise?.resolve(false);
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmDialog = () => (
    <ResponsiveDialog
      title={title}
      description={description}
      open={promise !== null}
      onOpenChange={handleClose}
    >
      <div className='flex w-full flex-col-reverse items-center justify-end gap-x-2 gap-y-2 pt-4 lg:flex-row'>
        <Button
          variant='outline'
          onClick={handleCancel}
          className='w-full lg:w-auto'
        >
          {cancelText ?? 'Cancel'}
        </Button>
        <Button onClick={handleConfirm} className='w-full lg:w-auto'>
          {confirmText ?? 'Confirm'}
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmDialog, confirm];
};
