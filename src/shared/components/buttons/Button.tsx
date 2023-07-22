import MuiButton from '@mui/material/Button';
import React from 'react';

import './buttonStyles.scss';

type ButtonProps = {
  variant?: 'outlined' | 'contained';
  onClick?: () => void;
  disabled?: boolean;
  label: string;
};

export const Button = ({ label, onClick, disabled, variant = 'contained' }: ButtonProps) => (
  <MuiButton onClick={onClick} variant={variant} disabled={disabled} className="buttons">
    {label}
  </MuiButton>
);
