import { FieldArray, FormikContextType } from 'formik';
import React from 'react';
import { FormText } from '@shared/components/forms/FormText';
import Button from '@mui/material/Button';
import { EducationFormValues } from '@careersTest/types/careersFormTypes';
import Divider from '@mui/material/Divider';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';

import { UniversityForm } from './UniversityForm';

import './formStyles.scss';

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
    <UniversityForm formik={formik} baseField="latestDegree" />
    <FieldArray name="additionalDegrees">
      {({ push, remove }) => (
        <div>
          {formik.values.additionalDegrees?.map((degree, index) => (
            <>
              <div className="row">
                <IconButton onClick={() => remove(index)}>
                  <RemoveCircleOutlineIcon color="error" />
                </IconButton>
                <div className="subHeader">University {index + 1}</div>
              </div>
              <UniversityForm
                key={`additional-degree-${index}`}
                baseField={`additionalDegrees[${index}]`}
                formik={formik}
              />
            </>
          ))}
          <Button onClick={() => push({})}>Add Another University</Button>
        </div>
      )}
    </FieldArray>
  </div>
);
