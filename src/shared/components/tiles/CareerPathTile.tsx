import React from 'react';
import { Card, Text, Container, Group, Badge, Button } from '@mantine/core';
import { CareerPath } from '@datatypes/career';

import { tileStyles } from './tileStyles';
import { careerPathTileStyles } from './careerPathTileStyles';

export const CareerPathTile = ({
  title,
  role,
  startingSalary,
  industry,
  companies,
  skills,
}: CareerPath) => {
  const { classes } = careerPathTileStyles();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section component="div" withBorder className={classes.cardHeader}>
        <Text weight={500} className={classes.title}>
          {title}
        </Text>
      </Card.Section>
      <Group position="apart" mt="md" mb="xs" className={classes.industrySection}>
        <Text weight={500}>{startingSalary}</Text>
        <Badge color="pink" variant="light">
          {industry}
        </Badge>
      </Group>
      <Text size="sm" color="dimmed" className={classes.role} lineClamp={5}>
        {role}
      </Text>
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Explore more
      </Button>
    </Card>
  );
};
