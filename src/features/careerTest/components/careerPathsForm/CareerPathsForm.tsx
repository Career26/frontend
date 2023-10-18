import { Text, Grid, Container } from '@mantine/core';
import React, { useEffect } from 'react';
import { formStyles } from '@shared/styles/formStyles';
import { useAppDispatch, useAppSelector } from '@state/store';
import { Shell } from '@shared/components/shell/Shell';
import { CareerCard } from '@shared/components/cards/CareerCard';
import { addIndustryColors, selectIndustryColors } from '@slices/sessionSlice';
import { useCareerSelection } from '@careerTest/hooks/useCareerSelection';
import { UserProfile } from '@datatypes/profile';

import { CareerPathActions } from './CareerPathActions';

export const CareerPathsForm = ({ careerPaths }: { careerPaths?: UserProfile['careerPaths'] }) => {
  const { classes } = formStyles();
  const industryColors = useAppSelector(selectIndustryColors);
  const { selectedCareers, toggleSelectedCareer, loadingCareers } = useCareerSelection();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const industries = Object.values(careerPaths || {}).map((item) => item.industry);
    dispatch(addIndustryColors(industries));
  }, [careerPaths]);

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
