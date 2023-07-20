import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';
import { IconButton } from '@mui/material';
import React from 'react';

import './formStyles.scss';

type RowHeaderProps = {
  label?: string;
  defaultLabel: string;
  index: number;
  onClick?: () => void;
  noButton?: boolean;
};

export const RowHeader = ({ label, defaultLabel, index, onClick, noButton }: RowHeaderProps) => (
  <div className="row">
    {!noButton && (
      <IconButton onClick={onClick}>
        <RemoveCircleOutline color="error" />
      </IconButton>
    )}
    <div className="subHeader">{label || `${defaultLabel} ${index}`}</div>
  </div>
);
