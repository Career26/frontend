import { Text, Grid, Container } from '@mantine/core';
import React, { useState } from 'react';
import { formStyles } from '@shared/styles/formStyles';
import { useAppSelector } from '@state/store';
import { selectCareerPaths, selectProfileId } from '@slices/userSlice';
import { Shell } from '@shared/components/shell/Shell';
import { useSelectCareerMutation } from '@apis/profileApi';
import { CareerCard } from '@shared/components/cards/CareerCard';
import { selectIndustryColors } from '@slices/careerSlice';

import { CareerPathActions } from './CareerPathActions';

export const CareerPathsForm = () => {
  const { classes } = formStyles();
  const careerPaths = useAppSelector(selectCareerPaths);
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const profileIdentifier = useAppSelector(selectProfileId);
  const [selectCareer] = useSelectCareerMutation();
  const [loadingCareers, setLoadingCareers] = useState<string[]>([]);
  const industryColors = useAppSelector(selectIndustryColors);

  const toggleSelectedCareer = async (careerIdentifier: string) => {
    if (!profileIdentifier) {
      return;
    }
    const selected = selectedCareers.includes(careerIdentifier);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await selectCareer({ careerIdentifier, profileIdentifier, selected });
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`select endpoint did not return data, response: ${error}`);
      return;
    }
    if (selected) {
      setSelectedCareers(selectedCareers.filter((id) => id !== careerIdentifier));
    } else {
      setSelectedCareers([...selectedCareers, careerIdentifier]);
    }
  };

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
                    onClickAction={async () => {
                      setLoadingCareers([...loadingCareers, careerId]);
                      await toggleSelectedCareer(careerId);
                      setLoadingCareers(loadingCareers.filter((id) => id !== careerId));
                    }}
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
