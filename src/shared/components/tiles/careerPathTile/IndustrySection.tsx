import { Text, Badge, Group } from '@mantine/core';
import React from 'react';

import { careerPathTileStyles } from './careerPathTileStyles';

export const IndustrySection = ({
  startingSalary,
  industry,
}: {
  startingSalary: string;
  industry: string;
}) => {
  const { classes } = careerPathTileStyles();
  return (
    <Group position="apart" mt="md" mb="xs" className={classes.industrySection}>
      <Text weight={500}>{startingSalary}</Text>
      <Badge color="pink" variant="light">
        {industry}
      </Badge>
    </Group>
  );
};
