import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { Profile } from '@datatypes/profile';
import { Text, Grid, Container } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { mockCareersTest } from '@mocks/careerTestMocks';
import { CareerPathTile } from '@shared/components/tiles/careerPathTile/CareerPathTile';
import React from 'react';

export const CareerPathsForm = ({ form }: { form: UseFormReturnType<Profile> }) => {
  const { classes } = questionFormStyles();
  return (
    <Container className={classes.questionContainer}>
      <Text className={classes.questionTitle}>CareerPaths</Text>
      <Grid>
        {Object.entries(mockCareersTest.careerPaths).map(([key, careerPath]) => (
          <Grid.Col md={6} key={`career-patj-${key}`}>
            <CareerPathTile {...careerPath} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
