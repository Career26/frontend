import { FormControlLabel, Radio } from '@mui/material';
import React from 'react';

import './radioButtonStyles.scss';

type RadioButtonProps = {
  onClick?: () => void;
  label: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  checked?: boolean;
};

export const RadioButton = ({ checked, label, onClick, labelPlacement }: RadioButtonProps) => (
  <FormControlLabel
    checked={checked}
    label={label}
    control={<Radio />}
    onClick={onClick}
    labelPlacement={labelPlacement}
    className="radioButton"
  />
);
