import { FormikContextType } from 'formik';
import React from 'react';
import { TextField } from '@mui/material';

export const FormText = <FormValuesType,>({
  formik,
  label,
  field,
}: {
  label: string;
  field: keyof FormValuesType;
  formik: FormikContextType<FormValuesType>;
}) => {
  const errorMessage = formik.errors[field];
  const helperText = !!formik.touched[field] && !!errorMessage ? String(errorMessage) : '';
  return (
    <TextField
      label={label}
      value={formik.values[field]}
      onChange={(e) => {
        formik.setFieldTouched(String(field), true);
        formik.setFieldValue(String(field), e.target.value);
      }}
      error={!!formik.errors[field]}
      helperText={helperText}
    />
  );
};
