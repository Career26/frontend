import React from 'react';
import { FormikContextType } from 'formik';
import { FormText } from '@shared/components/forms/FormText';
import { CareersFormValues, EducationFormValues } from '@careersTest/types/careersFormTypes';
import { FormSelect } from '@shared/components/forms/FormSelect';
import { degreeGrades, degreeLevels } from '@careersTest/config/careersFormConstants';

import './universityForm.scss';

export const UniversityForm = ({
  formik,
  baseField,
}: {
  formik: FormikContextType<CareersFormValues>;
  baseField: string;
}) => (
  <div>
    <div className="row">
      <div className="column">
        <FormText formik={formik} field={`${baseField}.universityName`} label="University Name*" />
      </div>
      <div className="column">
        <FormText formik={formik} field={`${baseField}.courseName`} label="Course Name*" />
      </div>
    </div>
    <div className="row">
      <div className="column">
        <FormSelect
          formik={formik}
          field={`${baseField}.degreeLevel`}
          label="Level*"
          options={degreeLevels}
        />
      </div>
      <div className="column">
        <FormSelect
          formik={formik}
          field={`${baseField}.degreeGrade`}
          label="Grade*"
          options={degreeGrades}
        />
      </div>
    </div>
  </div>
);