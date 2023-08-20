import { Text, Grid, Container, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { mockCareersTest } from '@mocks/careerTestMocks';
import React, { useState } from 'react';
import { CareerPathTile } from '@shared/components/tiles/careerPathTile/CareerPathTile';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';

export const CareerPathsForm = () => {
  const { classes } = questionFormStyles();
  const [loading, { toggle }] = useDisclosure(false);
  const [dislikedRoles, setDislikedRoles] = useState<string[]>([]);
  const rejectionCount = Number(localStorage.getItem('rejectionCount') || 0);

  const onClickDislike = (careerId: string) => {
    toggle();
    setDislikedRoles([...dislikedRoles, careerId]);
    setTimeout(() => toggle(), 2000);
    localStorage.setItem('rejectionCount', String(rejectionCount + 1));
  };

  return (
    <Container className={classes.questionContainer}>
      <Text className={classes.questionTitle}>Career Paths</Text>
      <Grid>
        {Object.entries(mockCareersTest.careerPaths).map(([careerId, careerPath]) => {
          const roleIsLoading = loading && dislikedRoles.includes(careerId);
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
