import { CareersFormValues, PreferencesFormValues } from '@careersTest/types/careersFormTypes';
import { FormikContextType } from 'formik';
import React from 'react';
import { InterestsForm } from './InterestsForm';
import { WorkStyleForm } from './WorkStyleForm';

import './preferencesForm.scss';

type PreferencesFormProps = {
  formik: FormikContextType<CareersFormValues>;
};

export const PreferencesForm = ({ formik }: PreferencesFormProps) => (
  <div className="dialogContainer">
    <InterestsForm formik={formik} />
    <WorkStyleForm formik={formik} />
  </div>
);
