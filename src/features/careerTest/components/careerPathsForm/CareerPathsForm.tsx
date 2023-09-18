import { Text, Grid, Container } from '@mantine/core';
import React, { useState } from 'react';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { useAppSelector } from '@state/store';
import { selectCareerPaths } from '@slices/userSlice';
import { Shell } from '@shared/components/shell/Shell';

import { CareerPathTile } from './CareerPathTile';

export const CareerPathsForm = () => {
  const { classes } = questionFormStyles();
  const careerPaths = useAppSelector(selectCareerPaths);
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const toggleSelectedCareer = (careerId: string) => {
    const selected = selectedCareers.includes(careerId);
    if (selected) {
      setSelectedCareers(selectedCareers.filter((id) => id !== careerId));
    } else {
      setSelectedCareers([...selectedCareers, careerId]);
    }
  };
  return (
    <Shell>
      <Container className={classes.questionContainer}>
        <Text className={classes.questionTitle}>Career Paths</Text>
        <Text align="center" className={classes.subHeader}>
          Select the careers that you like
        </Text>
        <Grid>
          {Object.entries(careerPaths || {}).map(([careerId, careerPath]) => (
            <Grid.Col md={6} key={`career-path-${careerId}`}>
              <CareerPathTile
                {...careerPath}
                onClickAction={() => toggleSelectedCareer(careerId)}
                selected={selectedCareers.includes(careerId)}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Shell>
  );
};
