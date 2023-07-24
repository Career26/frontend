import React, { useEffect, useState } from 'react';
import { mockCareersTest } from '@mocks/careerTestMocks';
import Grid from '@mui/material/Grid';

import { CareerCard } from '@careersTest/components/cards/CareerCard';
import { FormikContextType } from 'formik';
import { CareersFormValues, RefinementFormValues } from '@careersTest/types/careersFormTypes';
import { useGetCareersTestResultQuery } from '@apis/careersTestApi';
import { Loader } from '@mantine/core';

type CareerRefinementProps = {
  profile: CareersFormValues;
};

export const CareerRefinement = ({ profile }: CareerRefinementProps) => {
  const [dislikedJobs, setDislikedJobs] = useState<string[]>([]);

  const { data, isFetching } = useGetCareersTestResultQuery('pikachu');

  const clickRemove = (id: string) => {
    setDislikedJobs([...dislikedJobs, id]);
  };

  console.log(isFetching);

  useEffect(() => {
    if (dislikedJobs) {
      setTimeout(() => setDislikedJobs([]), 2000);
    }
  }, [dislikedJobs]);

  if (isFetching) {
    return <Loader />;
  }

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
                  onClickRemove={() => clickRemove(jobId)}
                  selected
                  loading={!!dislikedJobs.find((cardId) => cardId === jobId)}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};