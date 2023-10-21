import { Text } from '@mantine/core';
import React from 'react';

import styles from './interviewStyles.module.scss';

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
    <div className={styles.textIcon}>
      {Icon}
      <Text fw={800}>{title}</Text>
    </div>
    {content}
  </div>
);
