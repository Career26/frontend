import React from 'react';
import { Badge, Text } from '@mantine/core';
import { CareerPath } from '@datatypes/career';

import { careerPathTileStyles } from './careerPathTileStyles';
import { IndustrySection } from './IndustrySection';

const BadgeList = ({ title, items, color }: { title: string; items: string[]; color?: string }) => {
  const { classes } = careerPathTileStyles();
  return (
    <>
      <Text weight={500}>{title}</Text>
      <div className={classes.badgeList}>
        {items.map((item, key) => (
          <Badge size="lg" color={color} variant="light" key={`item-${key}`}>
            {item}
          </Badge>
        ))}
      </div>
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
  const { classes } = careerPathTileStyles();
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
