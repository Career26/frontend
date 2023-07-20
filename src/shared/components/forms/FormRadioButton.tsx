import React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

type FormRadioButtonsProps = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

export const FormRadioButton = ({ checked, onClick, label }: FormRadioButtonsProps) => (
  <FormControlLabel checked={checked} label={label} control={<Radio />} onClick={onClick} />
);
