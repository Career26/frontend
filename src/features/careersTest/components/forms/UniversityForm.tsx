// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { FormikContextType } from 'formik';
import { FormText } from '@shared/forms/FormText';
import { FormCheckbox } from '@shared/forms/FormCheckbox';

import { CareersTestFormValues } from '../../careersTestTypes';

export const UniversityForm = ({
  formik,
  baseField,
}: {
  formik: FormikContextType<CareersTestFormValues>;
  baseField: string;
}) => (
  <div>
    <FormText formik={formik} field={`${baseField}.univeristyName`} label="University Name" />
    <FormText formik={formik} field={`${baseField}.degreeName`} label="Degree Name" />
    <FormText formik={formik} field={`${baseField}.degreeLevel`} label="Degree Level" />
    <FormText formik={formik} field={`${baseField}.degreeGrade`} label="Degree Grade" />
    <FormCheckbox
      label="Is this grade predicted?"
      value={!!formik.values[baseField]?.isPredicted}
      onClick={() =>
        formik.setFieldValue(`${baseField}.isPredicted`, !formik.values[baseField]?.isPredicted)
      }
    />
  </div>
);
