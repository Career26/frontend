import { Grid } from '@mantine/core';
import { mockCareersTest } from '@mocks/careerTestMocks';
import { CareerPathNavigation } from '@shared/components/careerPathNavigation/CareerPathNavigation';
import { PageHeader } from '@shared/components/pageHeader/PageHeader';
import { CareerPathTile } from '@shared/components/tiles/careerPathTile/CareerPathTile';
import React from 'react';

const careerLinks = Object.entries(mockCareersTest.careerPaths).map(([id, value]) => ({
  title: value.title,
  id,
}));

export const HomePage = () => {
  const selectedCareer = '';
  return (
    <>
      <PageHeader />
      <CareerPathNavigation careerPaths={careerLinks} />
      <Grid>
        {Object.entries(mockCareersTest.careerPaths).map(([careerId, careerPath]) => (
          <Grid.Col md={6} key={`career-path-${careerId}`}>
            <CareerPathTile {...careerPath} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};
