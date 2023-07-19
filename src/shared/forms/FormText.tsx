import { FormikContextType } from 'formik';
import React from 'react';
import { TextField } from '@mui/material';

export const FormText = <FormValuesType,>({
  formik,
  label,
  field,
}: {
  label: string;
  field: keyof FormValuesType | string;
  formik: FormikContextType<FormValuesType>;
}) => {
  const formikField = field as keyof FormValuesType;
  const errorMessage = formik.errors[formikField];
  const helperText = !!formik.touched[formikField] && !!errorMessage ? String(errorMessage) : '';
  return (
    <TextField
      label={label}
      value={formik.values[formikField]}
      onChange={(e) => {
        formik.setFieldTouched(String(field), true);
        formik.setFieldValue(String(field), e.target.value);
      }}
      error={!!formik.errors[formikField]}
      helperText={helperText}
    />
  );
};
