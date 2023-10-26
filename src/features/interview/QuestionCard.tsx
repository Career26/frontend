import { Badge, Card, Group, Text } from '@mantine/core';
import React from 'react';
import commonStyles from '@shared/styles/commonStyles.module.scss';

import styles from './interviewStyles.module.scss';

export const QuestionCard = ({
  title,
  category,
  question,
  color,
}: {
  title: string;
  category: string;
  question: string;
  color: string;
}) => (
  <Card padding="lg" radius="md" withBorder className={styles.questionCard}>
    <Card.Section withBorder inheritPadding py="xs" className={commonStyles.lightNavyBg}>
      <Group justify="space-between">
        <Text fw="bold">{title}</Text>
        <Badge color={color}>{category}</Badge>
      </Group>
    </Card.Section>
    <Text py="lg">{question}</Text>
  </Card>
);
