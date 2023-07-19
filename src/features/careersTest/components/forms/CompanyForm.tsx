import { FormText } from '@shared/forms/FormText';
import { FormikContextType } from 'formik';
import React from 'react';
import { PreviousExperienceFormValues } from '@careersTest/types/careersFormTypes';

type CompanyFormProps = {
  formik: FormikContextType<PreviousExperienceFormValues>;
  index: number;
};

export const CompanyForm = ({ formik, index }: CompanyFormProps) => {
  const baseField = `previousWorkExperience[${index}]`;
  return (
    <div>
      <FormText formik={formik} field={`${baseField}.companyName`} label="Company Name" />
      <FormText formik={formik} field={`${baseField}.role`} label="Role" />
      <FormText formik={formik} field={`${baseField}.rating`} label="Rate you Experience" />
      <FormText formik={formik} field={`${baseField}.ratingReason`} label="Rating Reason" />
    </div>
  );
};
