import { Text, Grid, Container, Group } from '@mantine/core';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@state/store';
import { addIndustryColors, selectIndustryColors } from '@slices/sessionSlice';
import { useCareerSelection } from '@careerTest/hooks/useCareerSelection';
import { UserProfile } from '@datatypes/profile';
import styles from '@careerTest/careerTestStyles.module.scss';

import { ResultCard } from './ResultCard';

export const CareerPathsForm = ({
  careerPaths,
  profileId,
}: {
  profileId?: string;
  careerPaths?: UserProfile['careerPaths'];
}) => {
  const industryColors = useAppSelector(selectIndustryColors);
  const { selectedCareers, toggleSelectedCareer, loadingCareers } = useCareerSelection();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const industries = Object.values(careerPaths || {}).map((item) => item.industry);
    dispatch(addIndustryColors(industries));
  }, [careerPaths]);

  return (
    <Container py="md">
      <Group justify="center">
        <Text fw="bold" size="1.5rem">
          Career Paths
        </Text>
      </Group>
      <Group justify="center">
        <Text>Select the careers that you like</Text>
      </Group>
      <Grid py="lg" grow>
        {Object.entries(careerPaths || {}).map(
          ([careerId, { title, startingSalary, industry, role }]) => (
            <Grid.Col span={{ md: 6 }} key={`career-path-${careerId}`} className={styles.result}>
              <ResultCard
                salary={startingSalary}
                loading={loadingCareers[careerId]}
                role={role}
                selected={selectedCareers[careerId]}
                industry={industry}
                title={title}
                color={industryColors[industry]}
                onClick={() =>
                  toggleSelectedCareer({ careerIdentifier: careerId, profileIdentifier: profileId })
                }
              />
            </Grid.Col>
          ),
        )}
      </Grid>
    </Container>
  );
};
