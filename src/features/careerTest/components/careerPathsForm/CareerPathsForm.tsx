import { CareerFormProps } from '@careerTest/careerTestTypes';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { Text, Grid, Container } from '@mantine/core';
import { mockCareersTest } from '@mocks/careerTestMocks';
import { CareerPathTile } from '@shared/components/tiles/careerPathTile/CareerPathTile';
import React from 'react';

export const CareerPathsForm = ({ form }: { form: CareerFormProps }) => {
  const { classes } = questionFormStyles();

  const onClickDislike = (id: string) => {
    form.setFieldValue('dislikedResults', [...form.values.dislikedResults, id]);
  };

  return (
    <Container className={classes.questionContainer}>
      <Text className={classes.questionTitle}>Career Paths</Text>
      <Grid>
        {Object.entries(mockCareersTest.careerPaths).map(([key, careerPath]) => (
          <Grid.Col md={6} key={`career-patj-${key}`}>
            <CareerPathTile {...careerPath} onClickDislike={() => onClickDislike(key)} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
