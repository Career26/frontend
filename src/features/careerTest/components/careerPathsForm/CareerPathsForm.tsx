import { Text, Grid, Container, Button } from '@mantine/core';
import React, { useState } from 'react';
import { CareerPathTile } from '@shared/components/tiles/careerPathTile/CareerPathTile';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { useLazyRejectCareerQuery } from '@apis/profile';
import { useAppDispatch, useAppSelector } from '@state/store';
import { selectCareerPaths, selectProfileId, setCareerPaths } from '@slices/userSlice';

export const CareerPathsForm = () => {
  const dispatch = useAppDispatch();
  const { classes } = questionFormStyles();
  const [rejectCareer, { isFetching }] = useLazyRejectCareerQuery();
  const [dislikedRoles, setDislikedRoles] = useState<string[]>([]);
  const rejectionCount = Number(localStorage.getItem('rejectionCount') || 0);
  const profileId = useAppSelector(selectProfileId);
  const careerPaths = useAppSelector(selectCareerPaths);

  const onClickDislike = async (rejectedCareerId: string) => {
    if (!profileId || !careerPaths) {
      return;
    }
    setDislikedRoles([...dislikedRoles, rejectedCareerId]);
    try {
      const { data } = await rejectCareer({ careerId: rejectedCareerId, profileId });
      if (!data) {
        throw new Error('No data returned from rejection');
      }
      localStorage.setItem('rejectionCount', String(rejectionCount + 1));
      const newCareerPaths = Object.entries(careerPaths).reduce((agg, [careerId, careerPath]) => {
        if (careerId !== rejectedCareerId) {
          return { ...agg, [careerId]: careerPath };
        }
        return { ...agg, ...data };
      }, {});
      dispatch(setCareerPaths(newCareerPaths));
    } catch (error: unknown) {
      console.error((error as Error).message);
    }
    setDislikedRoles(dislikedRoles.filter((id) => id !== rejectedCareerId));
  };

  return (
    <Container className={classes.questionContainer}>
      <Text className={classes.questionTitle}>Career Paths</Text>
      <Grid>
        {Object.entries(careerPaths || {}).map(([careerId, careerPath]) => {
          const roleIsLoading = isFetching && dislikedRoles.includes(careerId);
          return (
            <Grid.Col md={6} key={`career-path-${careerId}`}>
              <CareerPathTile
                {...careerPath}
                buttons={
                  <Button
                    variant="light"
                    color="red"
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={() => onClickDislike(careerId)}
                    disabled={roleIsLoading}
                  >
                    I don&apos;t like this role
                  </Button>
                }
                loading={roleIsLoading}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
};
