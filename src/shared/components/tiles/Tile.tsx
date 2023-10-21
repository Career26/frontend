import React from 'react';
import { Card, Text, Container, ActionIcon } from '@mantine/core';
import classNames from 'classnames';

import styles from './tileStyles.module.scss';

interface TileComponentProps {
  withBottomPadding: boolean;
  withSpacing: boolean;
  title: string;
  description: string;
  icon: JSX.Element;
}

export const Tile = ({
  withBottomPadding,
  withSpacing,
  title,
  description,
  icon,
}: TileComponentProps) => (
  <Card
    className={classNames(styles.card, {
      [styles.withSpacing]: withSpacing,
      [styles.withBottomPadding]: withBottomPadding,
    })}
  >
    <Container className={styles.iconContainer}>
      <ActionIcon color="blue">{icon}</ActionIcon>
    </Container>
    <Container className={styles.textContainer}>
      <Text className={styles.title}>{title}</Text>
      <Text className={styles.description}>{description}</Text>
    </Container>
  </Card>
);
