import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import { FormikContextType, getIn } from 'formik';
import { RadioButton } from '../radioButtons/RadioButton';

import '@shared/styles/formStyles.scss';

type FormRadioButtonsProps<FormikValuesType> = {
  formik: FormikContextType<FormikValuesType>;
  field: keyof FormikValuesType | string;
};

const yes = 'Yes';
const no = 'No';

export const FormYesNoRadioButtons = <FormikValuesType,>({
  formik,
  field,
}: FormRadioButtonsProps<FormikValuesType>) => {
  const formikField = field as keyof FormikValuesType;
  const isYes = !!getIn(formik.values, formikField as string);

  const onClick = (label: 'Yes' | 'No') => {
    formik.setFieldValue(formikField as string, label === yes);
  };

  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
      row
    >
      <div className="radioLeft">
        <RadioButton checked={isYes} onClick={() => onClick(yes)} label={yes} />
      </div>
      <div className="radioRight">
        <RadioButton checked={!isYes} onClick={() => onClick(no)} label={no} />
      </div>
    </RadioGroup>
  );
};
