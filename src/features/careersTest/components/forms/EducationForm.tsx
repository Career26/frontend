import { FieldArray, FormikContextType } from 'formik';
import React from 'react';
import { FormText } from '@shared/components/forms/FormText';
import Button from '@mui/material/Button';
import { EducationFormValues } from '@careersTest/types/careersFormTypes';
import Divider from '@mui/material/Divider';

import { RowHeader } from './RowHeader';
import { UniversityForm } from './UniversityForm';

import '@shared/styles/formStyles.scss';

type EducationFormProps = {
  formik: FormikContextType<EducationFormValues>;
};

export const EducationForm = ({ formik }: EducationFormProps) => (
  <div className="dialogContainer">
    <div className="header">Education</div>
    <Divider />
    <div className="subHeader">Your Details</div>
    <div className="row">
      <div className="column">
        <FormText field="firstName" label="First Name" formik={formik} />
      </div>
      <div className="column">
        <FormText field="lastName" label="Last Name" formik={formik} />
      </div>
    </div>
    <Divider />
    <div className="subHeader">Universities</div>
    <RowHeader
      label={formik.values.latestDegree?.universityName}
      defaultLabel="University"
      index={1}
      noButton
    />
    <UniversityForm formik={formik} baseField="latestDegree" />
    <FieldArray name="additionalDegrees">
      {({ push, remove }) => (
        <div>
          {formik.values.additionalDegrees?.map((degree, index) => (
            <>
              <RowHeader
                label={formik.values.additionalDegrees?.[index]?.universityName}
                defaultLabel="University"
                onClick={() => remove(index)}
                index={index + 1}
              />
              <UniversityForm
                key={`additional-degree-${index}`}
                baseField={`additionalDegrees[${index}]`}
                formik={formik}
              />
            </>
          ))}
          <div className="row addRow">
            <Button variant="outlined" onClick={() => push({})}>
              Add Another University
            </Button>
          </div>
        </div>
      )}
    </FieldArray>
  </div>
);
