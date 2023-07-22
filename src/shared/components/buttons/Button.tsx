import MuiButton from '@mui/material/Button';
import React from 'react';

import './buttonStyles.scss';
import classNames from 'classnames';

type ButtonProps = {
  variant?: 'outlined' | 'contained';
  onClick?: () => void;
  disabled?: boolean;
  label: string;
  active?: boolean;
};

export const Button = ({
  label,
  onClick,
  active,
  disabled,
  variant = 'contained',
}: ButtonProps) => (
  <MuiButton
    onClick={onClick}
    disabled={disabled}
    variant={variant}
    className={classNames('buttons', { active })}
  >
    {label}
  </MuiButton>
);
