import React, { useEffect } from 'react';
import { mockCareersTest } from '@mocks/careerTestMocks';
import Grid from '@mui/material/Grid';

import { CareerCard } from '@careersTest/components/cards/CareerCard';
import { FormikContextType } from 'formik';
import { RefinementFormValues } from '@careersTest/types/careersFormTypes';

type CareerRefinementProps = {
  formik: FormikContextType<RefinementFormValues>;
};

export const CareerRefinement = ({ formik }: CareerRefinementProps) => {
  const dislikedJobs = formik.values.dislikedJobs || [];

  const setFormikValue = (value: string[]) => {
    formik.setFieldValue('dislikedJobs', value);
  };

  const clickRemove = (id: string) => {
    setFormikValue([...dislikedJobs, id]);
  };

  const clickAdd = (id: string) => {
    const newDislikedJobs: string[] = [...dislikedJobs].filter((item) => item !== id);
    setFormikValue(newDislikedJobs);
  };

  return (
    <div className="dialogContainer">
      <div className="dialogContent">
        <Grid container spacing={2}>
          {Object.keys(mockCareersTest.career_paths).map((jobId) => {
            const job = mockCareersTest.career_paths[jobId];
            return (
              <Grid key={`refinement-${jobId}`} item xs={12} sm={6}>
                <CareerCard
                  jobTitle={job.title}
                  industry={job.industry}
                  id={jobId}
                  salary={job.starting_salary}
                  companies={job.companies}
                  role={job.role}
                  reason={job.reason}
                  onClickAdd={() => clickAdd(jobId)}
                  onClickRemove={() => clickRemove(jobId)}
                  selected={!dislikedJobs.find((cardId) => cardId === jobId)}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};
