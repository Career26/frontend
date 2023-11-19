import { Group, Text } from '@mantine/core';
import React from 'react';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';

export const TextWithIconBlock = ({
  title,
  content,
  Icon,
}: {
  title: string;
  content: React.ReactNode;
  Icon: React.ReactNode;
}) => {
  const { isMobile } = useMobileStyles();
  return (
    <div>
      <Group className={commonStyles.row}>
        {Icon}
        <Text fw={800} size={isMobile ? '1rem' : '1.5rem'} py="md">
          {title}
        </Text>
      </Group>
      {content}
    </div>
  );
};
