import React from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormikContextType, getIn } from 'formik';

type FormSelectProps<FormikValuesType> = {
  label: string;
  options: Array<{ label: string; value: string }>;
  formik: FormikContextType<FormikValuesType>;
  field: keyof FormikValuesType | string;
};

export const FormSelect = <FormikValuesType,>({
  field,
  label,
  options,
  formik,
}: FormSelectProps<FormikValuesType>) => {
  const formikField = field as keyof FormikValuesType;
  const value = getIn(formik.values, formikField as string);
  const onChange = (newValue: string | FormikValuesType[keyof FormikValuesType]) => [
    formik.setFieldValue(formikField as string, newValue),
  ];
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        fullWidth
        variant="outlined"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
