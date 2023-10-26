import { Grid, Container } from '@mantine/core';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@state/store';
import { addIndustryColors, selectIndustryColors } from '@slices/sessionSlice';
import { useCareerSelection } from '@careerTest/hooks/useCareerSelection';
import { UserProfile } from '@datatypes/profile';
import styles from '@careerTest/careerTestStyles.module.scss';

import { ResultCard } from './ResultCard';
import { FormContent } from '../FormContent';

export const CareerPathsForm = ({
  careerPaths,
  profileId,
}: {
  profileId?: string;
  careerPaths?: UserProfile['careerPaths'];
}) => {
  const industryColors = useAppSelector(selectIndustryColors);
  const { toggleSelectedCareer, selectedCareers, loadingCareers } = useCareerSelection();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const industries = Object.values(careerPaths || {}).map((item) => item.industry);
    dispatch(addIndustryColors(industries));
  }, [careerPaths]);

  return (
    <Container py="md">
      <FormContent title="Select Your Favourite Career Paths">
        <Grid py="lg" grow>
          {Object.entries(careerPaths || {}).map(
            ([careerIdentifier, { title, startingSalary, industry, role }]) => {
              const selected = selectedCareers[careerIdentifier];
              return (
                <Grid.Col
                  span={{ md: 6 }}
                  key={`career-path-${careerIdentifier}`}
                  className={styles.result}
                >
                  <ResultCard
                    salary={startingSalary}
                    loading={loadingCareers[careerIdentifier]}
                    role={role}
                    selected={selected}
                    industry={industry}
                    title={title}
                    color={industryColors[industry]}
                    onClick={() =>
                      toggleSelectedCareer({
                        careerIdentifier,
                        profileIdentifier: profileId,
                        selected: !selected,
                      })
                    }
                  />
                </Grid.Col>
              );
            },
          )}
        </Grid>
      </FormContent>
    </Container>
  );
};
