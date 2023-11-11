import { Group, Text } from '@mantine/core';
import React from 'react';
import commonStyles from '@shared/styles/commonStyles.module.scss';

export const TextWithIconBlock = ({
  title,
  content,
  Icon,
}: {
  title: string;
  content: React.ReactNode;
  Icon: React.ReactNode;
}) => (
  <div>
    <Group className={commonStyles.row}>
      {Icon}
      <Text fw={800}>{title}</Text>
    </Group>
    {content}
  </div>
);
