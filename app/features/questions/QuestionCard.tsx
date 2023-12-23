import { Badge, Card, Group, Text } from '@mantine/core';

import commonStyles from '@shared/styles/commonStyles.module.css';
import styles from './questions.module.css';

interface QuestionCardProps {
  title: string;
  category: string;
  question: string;
  color: string;
}

export const QuestionCard = ({ title, category, question, color }: QuestionCardProps) => (
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
