import React from 'react';
import { Badge, Grid, Text } from '@mantine/core';
import { CareerPath } from '@datatypes/career';

import { careerPathTileStyles } from './careerPathTileStyles';
import { IndustrySection } from './IndustrySection';

const BadgeList = ({ title, items, color }: { title: string; items: string[]; color?: string }) => {
  const { classes } = careerPathTileStyles({});
  return (
    <>
      <Text weight={500}>{title}</Text>
      <Grid className={classes.badgeGrid}>
        {items.map((item, key) => (
          <Grid.Col md={6} key={`item-${key}`}>
            <Badge size="lg" color={color} variant="light" key={`item-${key}`}>
              {item}
            </Badge>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export const CareerPathContent = ({
  industry,
  startingSalary,
  role,
  reason,
  companies,
  skills,
}: Omit<CareerPath, 'title'>) => {
  const { classes } = careerPathTileStyles({});
  return (
    <>
      <IndustrySection industry={industry} startingSalary={startingSalary} />
      <Text weight={500}>Role</Text>
      <Text size="sm" color="dimmed" className={classes.careerSection} lineClamp={5}>
        {role}
      </Text>
      <Text weight={500}>Reason</Text>
      <Text size="sm" color="dimmed" className={classes.careerSection} lineClamp={5}>
        {reason}
      </Text>
      <BadgeList title="Example Companies" items={companies} />
      <BadgeList title="Example Skills" items={skills} color="pink" />
    </>
  );
};
