import { Container, Grid } from '@mantine/core';
import { mockCareersTest } from '@mocks/careerTestMocks';
import { CareerPathTile } from '@shared/components/tiles/careerPathTile/CareerPathTile';
import { setSelectedCareerPathId } from '@slices/careerPathsSlice';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { urls } from '@shared/config/urlConstants';

import { homePageStyles } from './homePageStyles';
import { Shell } from '@shared/components/shell/Shell';

export const HomePage = () => {
  const { classes } = homePageStyles();
  const history = useHistory();

  const onClickExplore = (id: string) => {
    setSelectedCareerPathId(id);
    history.push(`${urls.overview}/${id}`);
  };
  return (
    <Shell>
      <Container className={classes.main}>
        <Grid>
          {Object.entries(mockCareersTest.careerPaths).map(([id, careerPath]) => (
            <Grid.Col md={6} key={`career-path-${id}`} className={classes.gridTile}>
              <CareerPathTile {...careerPath} onClickExplore={() => onClickExplore(id)} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Shell>
  );
};
