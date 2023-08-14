import React from 'react';
import { Container, Text } from '@mantine/core';
import { IconWriting, IconRoute, IconTrophy, IconPlus } from '@tabler/icons-react';

import { Tile } from '@shared/components/tiles/Tile';

import { questionFormStyles } from '../styles/careeerTestStyles';

const headerTiles = [
  {
    title: 'Complete the Test',
    description:
      'Embark on your career journey by taking our comprehensive test to discover the best path for you.',
    icon: <IconWriting />,
  },
  {
    title: 'Explore Your Paths',
    description:
      'Using the results dive into career paths that align with your strengths and passions. Find the perfect fit.',
    icon: <IconRoute />,
  },
  {
    title: 'Unlock Your Potential',
    description:
      'Elevate your interview skills, refine your CV, and connect with professionals to accelerate your career growth.',
    icon: <IconTrophy />,
  },
];

export const CareerTestHeader = () => {
  const { classes } = questionFormStyles();
  return (
    <Container className={classes.titleContainer}>
      <Text className={classes.titleText}>Free Career Path Test</Text>
      <Container className={classes.testInfoContainer}>
        {headerTiles.map((item, index) => (
          <Tile
            withSpacing={index % 2 != 0}
            withBottomPadding={index + 1 !== headerTiles.length}
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </Container>
    </Container>
  );
};
