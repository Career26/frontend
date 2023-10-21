import { Badge, Card, Group, Text } from '@mantine/core';
import React from 'react';

import styles from './cardStyles.module.scss';

type CareerCardProps = {
  title: string;
  subTitle?: string;
  badge?: string;
  color?: string;
  content?: React.ReactNode;
  Actions?: React.ReactNode;
};

export const CareerCard = ({
  title,
  subTitle,
  badge,
  color,
  content,
  Actions,
}: CareerCardProps) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.cardContainer}>
    <Card.Section withBorder className={styles.cardHeader} inheritPadding>
      <Group justify="apart">
        <Text fw={800} className={styles.title}>
          {title}
        </Text>
        {Actions && <div className={styles.headerButtons}>{Actions}</div>}
      </Group>
    </Card.Section>
    <Group justify="apart" mt="md" mb="xs" className={styles.industrySection}>
      {subTitle && <Text fw={800}>{subTitle}</Text>}
      {badge && (
        <Badge color={color} variant="light">
          {badge}
        </Badge>
      )}
    </Group>
    {content && (
      <Text size="sm" className={styles.careerSection} lineClamp={5}>
        {content}
      </Text>
    )}
  </Card>
);
