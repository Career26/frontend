import { Badge, Card, Group, Text } from '@mantine/core';
import React from 'react';

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
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section withBorder inheritPadding py="xs">
      <Group justify="space-between">
        <Text fw="bold">{title}</Text>
        <Badge color={color}>{category}</Badge>
      </Group>
    </Card.Section>
    <Text py="lg">{question}</Text>
  </Card>
);
