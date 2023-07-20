import React from 'react';
import MuiDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import classNames from 'classnames';

import './dialogStyles.scss';

type DialogProps = {
  children: React.ReactNode;
  title: string;
  open: boolean;
  onClose?: () => void;
  actions?: React.ReactNode;
  extraClasses?: string;
};

export const Dialog = ({ children, title, open, onClose, actions, extraClasses }: DialogProps) => (
  <MuiDialog open={open} className={classNames('dialog', extraClasses)} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    {actions && <DialogActions>{actions}</DialogActions>}
  </MuiDialog>
);
