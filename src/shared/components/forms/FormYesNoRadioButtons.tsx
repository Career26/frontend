import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import { FormikContextType } from 'formik';
import { FormRadioButton } from './FormRadioButton';

import '@shared/styles/formStyles.scss';

type FormRadioButtonsProps<FormikValuesType> = {
  formik: FormikContextType<FormikValuesType>;
  field: keyof FormikValuesType | string;
};

export const FormYesNoRadioButtons = <FormikValuesType,>({
  formik,
  field,
}: FormRadioButtonsProps<FormikValuesType>) => {
  const formikField = field as keyof FormikValuesType;
  const isYes = !!formik.values[formikField];

  const onClick = (label: 'Yes' | 'No') => {
    formik.setFieldValue(formikField as string, label === 'Yes');
  };

  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
      row
    >
      <div className="radioButton">
        <FormRadioButton checked={isYes} onClick={() => onClick('Yes')} label="Yes" />
      </div>
      <div className="radioButton">
        <FormRadioButton checked={!isYes} onClick={() => onClick('No')} label="No" />
      </div>
    </RadioGroup>
  );
};
