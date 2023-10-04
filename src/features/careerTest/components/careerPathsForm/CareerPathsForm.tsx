import { Text, Grid, Container } from '@mantine/core';
import React from 'react';
import { formStyles } from '@shared/styles/formStyles';
import { useAppSelector } from '@state/store';
import { Shell } from '@shared/components/shell/Shell';
import { CareerCard } from '@shared/components/cards/CareerCard';
import { selectIndustryColors } from '@slices/sessionSlice';
import { useCareerSelection } from '@careerTest/hooks/useCareerSelection';
import { selectCareerPaths } from '@apis/profileApi';

import { CareerPathActions } from './CareerPathActions';

export const CareerPathsForm = () => {
  const { classes } = formStyles();
  const careerPaths = useAppSelector(selectCareerPaths);
  const industryColors = useAppSelector(selectIndustryColors);
  const { selectedCareers, toggleSelectedCareer, loadingCareers } = useCareerSelection();

  return (
    <Shell>
      <Container className={classes.questionContainer}>
        <Text className={classes.questionTitle}>Career Paths</Text>
        <Text className={classes.subHeader}>Select the careers that you like</Text>
        <Grid>
          {Object.entries(careerPaths || {}).map(([careerId, careerPath]) => (
            <Grid.Col md={6} key={`career-path-${careerId}`}>
              <CareerCard
                title={careerPath.title}
                subTitle={careerPath.startingSalary}
                badge={careerPath.industry}
                color={industryColors[careerPath.industry]}
                content={careerPath.role}
                Actions={
                  <CareerPathActions
                    loading={loadingCareers.includes(careerId)}
                    selected={selectedCareers.includes(careerId)}
                    onClickAction={() => toggleSelectedCareer(careerId)}
                  />
                }
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Shell>
  );
};
