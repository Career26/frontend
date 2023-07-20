import React from 'react';
import { FormikContextType } from 'formik';
import { FormCheckbox } from '@shared/components/forms/FormCheckbox';
import { FormText } from '@shared/components/forms/FormText';
import { citiesList } from '@careersTest/config/careersFormConstants';
import { FormSelect } from '@shared/components/forms/FormSelect';
import { WorkPreferencesFormValues } from '@careersTest/types/careersFormTypes';

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
    <div>
      Work Preferences
      <FormCheckbox
        label="Do you enjoy communicating ideas with to others?"
        formik={formik}
        field="enjoyTalkingToPeople"
      />
      <FormCheckbox
        label="Is a good work-life balance important to you?"
        formik={formik}
        field="wantGoodWorklifeBalance"
      />
      <FormSelect
        formik={formik}
        options={workTypeOptions}
        label="Do you prefer to work independently or as part of a group?"
        field="workStyle"
      />
      <FormSelect
        formik={formik}
        options={citiesList}
        label="Preferred City"
        field="expectedSalary.city"
      />
      <div>
        {selectedCity.symbol}
        <FormText
          formik={formik}
          field="expectedSalary.expectedSalary"
          label="What is your expected salary?"
        />
      </div>
    </div>
  );
};
