import React from 'react';
import { mockCardData } from '@mocks/careerTestMocks';
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
    const newLikedJobs = [...likedJobs].filter((item) => item !== id);
    setFormikValue(newLikedJobs);
  };

  return (
    <div className="dialogContainer">
      <div className="dialogContent">
        <Grid container spacing={2}>
          {mockCardData.map((card) => (
            <Grid key={`refinement-${card.jobTitle}`} item xs={12} sm={6}>
              <CareerCard
                {...card}
                onClickAdd={() => clickAdd(card.id)}
                onClickRemove={() => clickRemove(card.id)}
                selected={!!likedJobs.find((cardId) => cardId === card.id)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
