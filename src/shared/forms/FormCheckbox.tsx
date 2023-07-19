import { Checkbox, FormControlLabel } from '@mui/material';
import { FormikContextType } from 'formik';
import React from 'react';

type FormCheckboxProps<FormikValuesType> = {
  label: string;
  formik: FormikContextType<FormikValuesType>;
  field: keyof FormikValuesType | string;

  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
};

export const FormCheckbox = <FormikValuesType,>({
  label,
  formik,
  field,
  labelPlacement = 'start',
}: FormCheckboxProps<FormikValuesType>) => {
  const formikField = field as keyof FormikValuesType;
  const value = !!formik.values[formikField];
  const onClick = () => {
    formik.setFieldValue(formikField as string, !value);
  };
  return (
    <FormControlLabel
      control={<Checkbox value={value} onClick={onClick} />}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
};
