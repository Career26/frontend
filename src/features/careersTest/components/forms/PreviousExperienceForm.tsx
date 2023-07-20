import { FieldArray, FormikContextType } from 'formik';
import React from 'react';
import Button from '@mui/material/Button';
import { PreviousExperienceFormValues } from '@careersTest/types/careersFormTypes';

import { CompanyForm } from './CompanyForm';

type PreviousExperienceFormProps = {
  formik: FormikContextType<PreviousExperienceFormValues>;
};

export const PreviousExperienceForm = ({ formik }: PreviousExperienceFormProps) => (
  <div>
    Previous Experiences
    <FieldArray name="previousWorkExperience">
      {({ push, remove }) => (
        <div>
          <h3>Company 1</h3>
          <CompanyForm key="company-1" formik={formik} index={0} />
          {formik.values.previousWorkExperience?.map((_, index) => (
            <>
              <h3>Company {index + 2}</h3>
              <CompanyForm key={`company-${index}`} formik={formik} index={index + 1} />
              <Button onClick={() => remove(index)}>Remove Company</Button>
            </>
          ))}
          <Button onClick={() => push({})}>Add Another Company</Button>
        </div>
      )}
    </FieldArray>
  </div>
);
