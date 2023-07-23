import { FieldArray, FormikContextType } from 'formik';
import React from 'react';
import { Button } from '@shared/components/buttons/Button';
import { PreviousExperienceFormValues } from '@careersTest/types/careersFormTypes';
import Divider from '@mui/material/Divider';

import { CompanyForm } from './CompanyForm';
import { RowHeader } from '../RowHeader';

type PreviousExperienceFormProps = {
  formik: FormikContextType<PreviousExperienceFormValues>;
};

export const PreviousExperienceForm = ({ formik }: PreviousExperienceFormProps) => {
  const [firstExperience, ...previousWorkExperiences] = formik.values.previousWorkExperience || [];
  return (
    <div className="dialogContainer">
      <div className="header">Previous Experiences</div>
      <Divider />
      <div className="addRow">
        <RowHeader
          label={firstExperience?.companyName}
          defaultLabel="Experience"
          index={1}
          noButton
        />
      </div>
      <CompanyForm key="company-1" formik={formik} index={0} />
      <FieldArray name="previousWorkExperience">
        {({ push, remove }) => (
          <div>
            {previousWorkExperiences?.map((_, index) => (
              <>
                <RowHeader
                  label={previousWorkExperiences?.[index]?.companyName}
                  defaultLabel="Experience"
                  index={index + 2}
                  onClick={() => remove(index)}
                />
                <CompanyForm key={`company-${index}`} formik={formik} index={index + 1} />
              </>
            ))}
            <Button variant="outlined" onClick={() => push({})} label="Add Another Experience" />
          </div>
        )}
      </FieldArray>
    </div>
  );
};
