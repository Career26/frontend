import React from 'react';
import { Button } from '@mui/material';

import { Dialog } from './Dialog';

type DialogProps = {
  children: React.ReactNode;
  title: string;
  open: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  cancelDisabled?: boolean;
  confirmDisabled?: boolean;
  ignoreCancelButton?: boolean;
  extraClasses?: string;
};

export const ConfirmationDialog = ({
  children,
  title,
  open,
  onCancel,
  onConfirm,
  confirmDisabled,
  confirmLabel = 'confirm',
  cancelDisabled,
  cancelLabel = 'cancel',
  ignoreCancelButton = false,
  extraClasses,
}: DialogProps) => (
  <Dialog
    extraClasses={extraClasses}
    open={open}
    onClose={onCancel}
    title={title}
    actions={
      <>
        {!ignoreCancelButton && (
          <Button disabled={cancelDisabled} onClick={onCancel}>
            {cancelLabel}
          </Button>
        )}
        <Button disabled={confirmDisabled} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </>
    }
  >
    {children}
  </Dialog>
);
