import { Checkbox } from '@mui/material';
import React from 'react';

type FormCheckboxProps = {
  label: string;
  value: boolean;
  onClick: () => void;
};

export const FormCheckbox = ({ label, value, onClick }: FormCheckboxProps) => {
  const labelProps = { inputProps: { 'aria-label': label } };
  return <Checkbox {...labelProps} value={value} onClick={onClick} />;
};
