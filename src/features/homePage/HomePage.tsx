import { Container, Grid } from '@mantine/core';
import { CareerPathTile } from '@shared/components/tiles/careerPathTile/CareerPathTile';
import { selectCareerPaths, setSelectedCareerPathId } from '@slices/userSlice';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { urls } from '@shared/config/urlConstants';
import { Shell } from '@shared/components/shell/Shell';
import { useAppSelector } from '@state/store';

import { homePageStyles } from './homePageStyles';

export const HomePage = () => {
  const { classes } = homePageStyles();
  const history = useHistory();

  const onClickExplore = (id: string) => {
    setSelectedCareerPathId(id);
    history.push(`${urls.overview}/${id}`);
  };

  const careerPaths = useAppSelector(selectCareerPaths);

  return (
    <Shell>
      <Container className={classes.main}>
        <Grid>
          {Object.entries(careerPaths || {}).map(([id, careerPath]) => (
            <Grid.Col md={6} key={`career-path-${id}`} className={classes.gridTile}>
              <CareerPathTile {...careerPath} onClickExplore={() => onClickExplore(id)} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Shell>
  );
};
