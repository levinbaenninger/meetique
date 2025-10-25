import { type JSX, useState } from "react";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";

export const useConfirm = (
  title: string,
  description: string,
  confirmText?: string,
  cancelText?: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

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
      description={description}
      onOpenChange={handleClose}
      open={promise !== null}
      title={title}
    >
      <div className="flex w-full flex-col-reverse items-center justify-end gap-x-2 gap-y-2 pt-4 lg:flex-row">
        <Button
          className="w-full lg:w-auto"
          onClick={handleCancel}
          variant="outline"
        >
          {cancelText ?? "Cancel"}
        </Button>
        <Button className="w-full lg:w-auto" onClick={handleConfirm}>
          {confirmText ?? "Confirm"}
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmDialog, confirm];
};
