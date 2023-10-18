import { Text, Grid, Container, createStyles } from '@mantine/core';
import React, { useEffect } from 'react';
import { formStyles } from '@shared/styles/formStyles';
import { useAppDispatch, useAppSelector } from '@state/store';
import { Shell } from '@shared/components/shell/Shell';
import { CareerCard } from '@shared/components/cards/CareerCard';
import { addIndustryColors, selectIndustryColors } from '@slices/sessionSlice';
import { useCareerSelection } from '@careerTest/hooks/useCareerSelection';
import { UserProfile } from '@datatypes/profile';

import { CareerPathActions } from './CareerPathActions';

const careerPathsStyles = createStyles({
  tile: {
    width: '100vh',
  },
});

export const CareerPathsForm = ({
  careerPaths,
  profileId,
}: {
  profileId?: string;
  careerPaths?: UserProfile['careerPaths'];
}) => {
  const { classes } = careerPathsStyles();
  const { classes: formClasses } = formStyles();
  const industryColors = useAppSelector(selectIndustryColors);
  const { selectedCareers, toggleSelectedCareer, loadingCareers } = useCareerSelection();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const industries = Object.values(careerPaths || {}).map((item) => item.industry);
    dispatch(addIndustryColors(industries));
  }, [careerPaths]);

  return (
    <Shell>
      <Container className={formClasses.questionContainer}>
        <Text className={formClasses.questionTitle}>Career Paths</Text>
        <Text className={formClasses.subHeader}>Select the careers that you like</Text>
        <Grid>
          {Object.entries(careerPaths || {}).map(([careerId, careerPath]) => (
            <Grid.Col md={6} key={`career-path-${careerId}`} className={classes.tile}>
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
                    onClickAction={() => toggleSelectedCareer(careerId, profileId)}
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
