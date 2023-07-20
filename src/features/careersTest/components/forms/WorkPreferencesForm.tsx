import React from 'react';
import { FormikContextType } from 'formik';
import { FormText } from '@shared/components/forms/FormText';
import { citiesList } from '@careersTest/config/careersFormConstants';
import { FormSelect } from '@shared/components/forms/FormSelect';
import { WorkPreferencesFormValues } from '@careersTest/types/careersFormTypes';
import Divider from '@mui/material/Divider';
import { FormYesNoRadioButtons } from '@shared/components/forms/FormYesNoRadioButtons';

import './workPreferencesForm.scss';

type WorkPreferencesFormProps = {
  formik: FormikContextType<WorkPreferencesFormValues>;
};

const workTypeOptions = [
  { label: 'Independent', value: 'INDEPENDENT' },
  { label: 'Group', value: 'Group' },
];

export const WorkPreferencesForm = ({ formik }: WorkPreferencesFormProps) => {
  const selectedCity =
    citiesList.find((city) => city.value === formik.values.expectedSalary?.city) || citiesList[0];
  return (
    <div className="dialogContainer">
      <div className="header">Work Preferences</div>
      <Divider />
      <div className="row">
        <div className="column">
          <div className="radio">
            <div className="label">Do you enjoy communicating ideas with to others?</div>
            <FormYesNoRadioButtons field="enjoyTalkingToPeople" formik={formik} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column radio">
          <div className="label">Are you willing to sacrifice your work-life balance?</div>
          <FormYesNoRadioButtons field="sacrificeWorkLifeBalance" formik={formik} />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <FormSelect
            formik={formik}
            options={workTypeOptions}
            label="Preferred Work Style"
            field="workStyle"
          />
        </div>
        <div className="column">
          <FormSelect
            formik={formik}
            options={citiesList}
            label="Preferred City"
            field="expectedSalary.city"
          />
        </div>
        <div className="column">
          <FormText
            formik={formik}
            field="expectedSalary.expectedSalary"
            label={`Expected Salary (${selectedCity.symbol})`}
          />
        </div>
      </div>
    </div>
  );
};
