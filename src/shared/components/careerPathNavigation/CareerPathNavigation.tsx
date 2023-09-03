import React from 'react';
import { Header, Container, Group, Select, Button } from '@mantine/core';
import {
  selectCareerPaths,
  selectSelectedCareerPath,
  selectSelectedCareerPathId,
} from '@slices/userSlice';
import { useAppSelector } from '@state/store';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';

import { careerPathNavigationStyles } from './careerPathNavigationStyles';

export const CareerPathNavigation = () => {
  const { classes } = careerPathNavigationStyles();
  const selectedCareerPath = useAppSelector(selectSelectedCareerPath);
  const careerPaths = useAppSelector(selectCareerPaths);
  const selectedCareerPathId = useAppSelector(selectSelectedCareerPathId);
  const { toggleCareerPath } = usePageNavigation();

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
            onChange={toggleCareerPath}
          />
        </Group>
        <Group spacing={15} className={classes.links}>
          {Object.entries(careerPaths || {}).map(([id, careerPath]) => (
            <Button
              key={`career-path-${id}`}
              onClick={() => toggleCareerPath(id)}
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
