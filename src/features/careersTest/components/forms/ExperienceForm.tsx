import { FieldArray, FormikContextType } from 'formik';
import React from 'react';
import { Button } from '@mui/material';

import { PreviousExperienceFormValues } from '../../careersTestTypes';
import { CompanyForm } from './CompanyForm';

type PreviousExperienceFormProps = {
  formik: FormikContextType<PreviousExperienceFormValues>;
};

export const PreviousExperienceForm = ({ formik }: PreviousExperienceFormProps) => (
  <div>
    Previous Experiences
    <form>
      <FieldArray name="previousWorkExperience">
        {({ push, remove }) => (
          <div>
            <CompanyForm key="company-primary" formik={formik} />
            {formik.values.previousWorkExperience?.map((company, index) => (
              <>
                <h3>Company {index + 2}</h3>
                <CompanyForm key={`company-${company.companyName}`} formik={formik} />
                <Button onClick={() => remove(index)}>Remove Company</Button>
              </>
            ))}
            <Button onClick={() => push({})}>Add Another Company</Button>
          </div>
        )}
      </FieldArray>
    </form>
  </div>
);
