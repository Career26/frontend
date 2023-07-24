import { FieldArray, FormikContextType } from 'formik';
import React from 'react';
import { FormText } from '@shared/components/forms/FormText';
import { Button } from '@shared/components/buttons/Button';
import { CareersFormValues, EducationFormValues } from '@careersTest/types/careersFormTypes';
import Divider from '@mui/material/Divider';

import { RowHeader } from '../RowHeader';
import { UniversityForm } from './UniversityForm';

import '@shared/styles/formStyles.scss';

type EducationFormProps = {
  formik: FormikContextType<CareersFormValues>;
};

export const EducationForm = ({ formik }: EducationFormProps) => (
  <div className="dialogContainer">
    <div className="header">Your Details</div>
    <Divider />
    <div className="row">
      <div className="column">
        <FormText field="firstName" label="First Name*" formik={formik} />
      </div>
      <div className="column">
        <FormText field="lastName" label="Last Name*" formik={formik} />
      </div>
    </div>
    <div className="header">Universities</div>
    <Divider />
    <div className="addRow">
      <RowHeader
        label={formik.values.latestDegree?.universityName}
        defaultLabel="University"
        index={1}
        noButton
      />
    </div>
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
                index={index + 2}
              />
              <UniversityForm
                key={`additional-degree-${index}`}
                baseField={`additionalDegrees[${index}]`}
                formik={formik}
              />
            </>
          ))}
          <div className="row addRow">
            <Button variant="outlined" onClick={() => push({})} label="Add Another University" />
          </div>
        </div>
      )}
    </FieldArray>
  </div>
);
