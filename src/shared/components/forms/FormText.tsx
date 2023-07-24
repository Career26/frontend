import { FormikContextType, getIn } from 'formik';
import React from 'react';
import TextField from '@mui/material/TextField';

type FormTextProps<FormValuesType> = {
  label: string;
  field: keyof FormValuesType | string;
  formik: FormikContextType<FormValuesType>;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
};

export const FormText = <FormValuesType,>({
  formik,
  label,
  field,
  placeholder,
  type,
  multiline,
  rows,
}: FormTextProps<FormValuesType>) => {
  const formikField = field as keyof FormValuesType;
  const touched = !!getIn(formik.touched, formikField as string);
  const errorMessage = getIn(formik.errors, formikField as string);
  const helperText = touched && !!errorMessage ? String(errorMessage) : '';
  const value = getIn(formik.values, formikField as string);

  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => {
        formik.setFieldTouched(String(field), true);
        formik.setFieldValue(String(field), e.target.value);
      }}
      error={!!helperText}
      helperText={helperText}
      placeholder={placeholder}
      type={type}
      multiline={multiline}
      rows={rows}
    />
  );
};
