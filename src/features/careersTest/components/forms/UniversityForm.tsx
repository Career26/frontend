import React from 'react';
import { FormikContextType } from 'formik';
import { FormText } from '@shared/components/forms/FormText';
import { FormCheckbox } from '@shared/components/forms/FormCheckbox';
import { EducationFormValues } from '@careersTest/types/careersFormTypes';

export const UniversityForm = ({
  formik,
  baseField,
}: {
  formik: FormikContextType<EducationFormValues>;
  baseField: string;
}) => (
  <div>
    <FormText formik={formik} field={`${baseField}.univeristyName`} label="University Name" />
    <FormText formik={formik} field={`${baseField}.degreeName`} label="Degree Name" />
    <FormText formik={formik} field={`${baseField}.degreeLevel`} label="Degree Level" />
    <FormText formik={formik} field={`${baseField}.degreeGrade`} label="Degree Grade" />
    <FormCheckbox
      label="Is this grade predicted?"
      formik={formik}
      field={`${baseField}.isPredicted`}
    />
  </div>
);
