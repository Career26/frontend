import { ActionIcon, Badge, Card, Group, Text } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

import commonStyles from '@shared/styles/commonStyles.module.css';

interface CareerPathActionsProps {
  loading?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

interface ResultCardProps extends CareerPathActionsProps {
  title: string;
  color: string;
  industry: string;
  salary: string;
  role: string;
}

export const ResultCard = ({
  title,
  color,
  industry,
  selected,
  loading,
  salary,
  role,
  onClick,
}: ResultCardProps) => (
  <Card padding="lg" withBorder h="100%">
    <Card.Section withBorder inheritPadding py="xs" className={commonStyles.lightNavyBg}>
      <Group justify="space-between">
        <Text fw="bold">{title}</Text>
        <ActionIcon loading={loading} onClick={onClick} variant="transparent">
          <IconHeart
            size={50}
            fill={selected ? 'red' : 'transparent'}
            color={selected ? 'red' : 'navy'}
          />
        </ActionIcon>
      </Group>
    </Card.Section>
    <Group justify="space-between" py="sm">
      <Text fw="bold">{salary}</Text>
      <Badge color={color}>{industry}</Badge>
    </Group>
    {role}
  </Card>
);
