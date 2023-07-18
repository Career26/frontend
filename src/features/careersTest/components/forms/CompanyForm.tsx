// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FormText } from '@shared/forms/FormText';
import { FormikContextType } from 'formik';
import React from 'react';

import { PreviousExperienceFormValues } from '../../careersTestTypes';

type CompanyFormProps = {
  formik: FormikContextType<PreviousExperienceFormValues>;
};

export const CompanyForm = ({ formik }: CompanyFormProps) => (
  <div>
    <FormText formik={formik} field="previousWorkExperience.companyName" label="Company Name" />
    <FormText formik={formik} field="previousWorkExperience.role" label="Role" />
    <FormText formik={formik} field="previousWorkExperience.rating" label="Rate you Experience" />
    <FormText formik={formik} field="previousWorkExperience.ratingReason" label="Rating Reason" />
  </div>
);
