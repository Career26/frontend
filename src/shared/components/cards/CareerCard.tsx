import { Badge, Card, Group, Text } from '@mantine/core';
import React from 'react';

type CareerCardProps = {
  title: React.ReactNode;
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
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section withBorder w="100%" inheritPadding>
      {title}
      {Actions}
    </Card.Section>
    <Group justify="apart" mt="md" mb="xs" w="100%">
      {subTitle && <Text fw={800}>{subTitle}</Text>}
      {badge && (
        <Badge color={color} variant="light">
          {badge}
        </Badge>
      )}
    </Group>
    {content && (
      <Text size="sm" lineClamp={5}>
        {content}
      </Text>
    )}
  </Card>
);
