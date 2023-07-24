import React from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormikContextType } from 'formik';

type FormSelectProps<FormikValuesType> = {
  label: string;
  options: Array<{ label: string; value: string }>;
  formik: FormikContextType<FormikValuesType>;
  field: keyof FormikValuesType | string;
  defaultValue: string | FormikValuesType[keyof FormikValuesType];
};

export const FormSelect = <FormikValuesType,>({
  field,
  label,
  options,
  formik,
  defaultValue,
}: FormSelectProps<FormikValuesType>) => {
  const formikField = field as keyof FormikValuesType;
  const value = formik.values[formikField];
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
        defaultValue={defaultValue}
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
