import React from 'react';
import { Button } from '@shared/components/buttons/Button';

import { Dialog } from './Dialog';

type DialogProps = {
  children: React.ReactNode;
  title: string | React.ReactNode;
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
          <Button
            disabled={cancelDisabled}
            onClick={onCancel}
            variant="outlined"
            label={cancelLabel}
          />
        )}
        <Button
          disabled={confirmDisabled}
          onClick={onConfirm}
          variant="contained"
          label={confirmLabel}
        />
      </>
    }
  >
    {children}
  </Dialog>
);
