import { FormText } from '@shared/components/forms/FormText';
import { FormikContextType } from 'formik';
import React from 'react';
import { PreviousExperienceFormValues } from '@careersTest/types/careersFormTypes';

import './companyForm.scss';

type CompanyFormProps = {
  formik: FormikContextType<PreviousExperienceFormValues>;
  index: number;
};

export const CompanyForm = ({ formik, index }: CompanyFormProps) => {
  const baseField = `previousWorkExperience[${index}]`;
  return (
    <div>
      <div className="row">
        <div className="column">
          <FormText formik={formik} field={`${baseField}.companyName`} label="Company Name" />
        </div>
        <div className="column">
          <FormText formik={formik} field={`${baseField}.role`} label="Role" />
        </div>
        <div className="rateExperience">
          <div className="column">
            <FormText
              formik={formik}
              field={`${baseField}.rating`}
              label="Rating (1-5)"
              type="number"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <FormText
            formik={formik}
            field={`${baseField}.ratingReason`}
            label="Rating Reason"
            multiline
          />
        </div>
      </div>
    </div>
  );
};
