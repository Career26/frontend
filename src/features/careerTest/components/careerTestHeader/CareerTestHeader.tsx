import React from 'react';
import { Card, Container, Group, Text } from '@mantine/core';
import { IconWriting, IconRoute, IconTrophy } from '@tabler/icons-react';
import styles from '@careerTest/components/careerTestHeader/careerTestHeader.module.scss';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';
import classNames from 'classnames';

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

export const CareerTestHeader = () => {
  const { isMobile } = useMobileStyles();
  return (
    <Container py="md" className={styles.headerContainer}>
      <Text fw="bold" className={styles.titleText}>
        Career Path Test
      </Text>
      {!isMobile && (
        <Container display="flex">
          {headerTiles.map(({ title, description, Icon }) => (
            <Card padding="sm" mx="sm" withBorder key={`career-header-${title}`}>
              <Group
                className={classNames(styles.cardGroup, { [styles.cardGroupMobile]: isMobile })}
              >
                <Group
                  className={classNames(styles.cardGroup, { [styles.cardGroupMobile]: isMobile })}
                >
                  {Icon}
                  <Text fw="bold">{title}</Text>
                </Group>
                {!isMobile && <Text>{description}</Text>}
              </Group>
            </Card>
          ))}
        </Container>
      )}
    </Container>
  );
};
