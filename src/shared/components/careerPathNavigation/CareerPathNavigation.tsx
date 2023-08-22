import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Container, Group, Select, Button } from '@mantine/core';
import {
  selectCareerPaths,
  selectSelectedCareerPath,
  selectSelectedCareerPathId,
  setSelectedCareerPathId,
} from '@slices/careerPathsSlice';
import { useAppDispatch, useAppSelector } from '@state/store';

import { careerPathNavigationStyles } from './careerPathNavigationStyles';

export const CareerPathNavigation = () => {
  const { classes } = careerPathNavigationStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const selectedCareerPath = useAppSelector(selectSelectedCareerPath);
  const careerPaths = useAppSelector(selectCareerPaths);
  const selectedCareerPathId = useAppSelector(selectSelectedCareerPathId);

  const onClickCareerPath = (id: string) => {
    dispatch(setSelectedCareerPathId(id));
    const basePath = history.location.pathname.replace(/([^/]+$)/gm, '');
    history.push(`${basePath}${id}`);
  };

  if (!careerPaths) {
    return null;
  }

  return (
    <Header height="auto" py="xs" withBorder className={classes.header}>
      <Container className={classes.inner}>
        <Group className={classes.pathSelector}>
          <Select
            data={Object.entries(careerPaths).map(([id, value]) => ({
              value: id,
              label: value.title,
            }))}
            placeholder={selectedCareerPath?.title}
            value={selectedCareerPathId}
            onChange={onClickCareerPath}
          />
        </Group>
        <Group spacing={5} className={classes.links}>
          {Object.entries(careerPaths || {}).map(([id, careerPath]) => (
            <Button
              key={`career-path-${id}`}
              onClick={() => onClickCareerPath(id)}
              size="xs"
              variant={selectedCareerPathId === id ? 'filled' : 'outline'}
            >
              {careerPath.title}
            </Button>
          ))}
        </Group>
      </Container>
    </Header>
  );
};
