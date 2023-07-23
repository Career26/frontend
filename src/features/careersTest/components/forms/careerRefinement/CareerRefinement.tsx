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
  const likedJobs = formik.values.likedJobs || [];

  const setFormikValue = (value: string[]) => {
    formik.setFieldValue('likedJobs', value);
  };

  const clickAdd = (id: string) => {
    setFormikValue([...likedJobs, id]);
  };

  const clickRemove = (id: string) => {
    const newLikedJobs: string[] = [...likedJobs].filter((item) => item !== id);
    setFormikValue(newLikedJobs);
  };

  useEffect(() => {
    const allJobIds = Object.keys(mockCareersTest.career_paths);
    setFormikValue(allJobIds);
  }, [mockCareersTest]);

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
                  selected={!!likedJobs.find((cardId) => cardId === jobId)}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};
