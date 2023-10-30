import React from 'react';
import { Card, Container, Group, Text } from '@mantine/core';
import { IconWriting, IconRoute, IconTrophy } from '@tabler/icons-react';
import styles from '@careerTest/components/careerTestHeader/careerTestHeader.module.scss';

const headerTiles = [
  {
    title: 'Complete the Test',
    description:
      'Embark on your career journey by taking our comprehensive test to discover the best path for you.',
    Icon: <IconWriting />,
  },
  {
    title: 'Explore Your Paths',
    description:
      'Using the results dive into career paths that align with your strengths and passions. Find the perfect fit.',
    Icon: <IconRoute />,
  },
  {
    title: 'Unlock Your Potential',
    description:
      'Improve your interview skills, enhance your CV, and build a network to accelerate your career.',
    Icon: <IconTrophy />,
  },
];

export const CareerTestHeader = () => (
  <Container py="md" className={styles.headerContainer}>
    <Text fw="bold" className={styles.titleText}>
      Career Path Test
    </Text>
    <Container display="flex">
      {headerTiles.map(({ title, description, Icon }) => (
        <Card w="400" padding="sm" mx="sm" withBorder key={`career-header-${title}`}>
          <Group className={styles.cardGroup}>
            <Group>
              {Icon}
              <Text fw="bold">{title}</Text>
            </Group>
            <Text>{description}</Text>
          </Group>
        </Card>
      ))}
    </Container>
  </Container>
);