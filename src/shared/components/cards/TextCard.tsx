import { Card } from '@mantine/core';
import React from 'react';

import styles from './cardStyles.module.scss';

export const TextCard = ({ content }: { content: React.ReactNode }) => (
  <Card className={styles.cardContainer} shadow="md" radius="md" p="md" withBorder>
    <div className={styles.cardDescription}>{content}</div>
  </Card>
);
