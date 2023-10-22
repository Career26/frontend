import React from 'react';
import { Card, Container, Group, Text } from '@mantine/core';
import { IconWriting, IconRoute, IconTrophy } from '@tabler/icons-react';
import styles from '@careerTest/careerTestStyles.module.scss';

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
      'Elevate your interview skills, refine your CV, and connect with professionals to accelerate your career growth.',
    Icon: <IconTrophy />,
  },
];

export const CareerTestHeader = () => (
  <Container py="md">
    <Group justify="center">
      <Text fw="bold">Free Career Path Test</Text>
      <Container display="flex" className={styles.testHeader}>
        {headerTiles.map(({ title, description, Icon }) => (
          <Card shadow="sm" padding="sm" withBorder key={`career-header-${title}`}>
            <Group display="flex" align="center" justify="center">
              <Group display="flex" justify="space-between">
                {Icon}
                <Text fw="bold">{title}</Text>
              </Group>
              <Text>{description}</Text>
            </Group>
          </Card>
        ))}
      </Container>
    </Group>
  </Container>
);
