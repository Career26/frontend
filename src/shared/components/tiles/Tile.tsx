import React from 'react';
import { Card, Text, Container, ActionIcon } from '@mantine/core';

import { tileStyles } from './tileStyles';

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
}: TileComponentProps) => {
  const { classes } = tileStyles({ withSpacing, withBottomPadding });

  return (
    <Card className={classes.card}>
      <Container className={classes.iconContainer}>
        <ActionIcon color="blue">{icon}</ActionIcon>
      </Container>
      <Container className={classes.textContainer}>
        <Text className={classes.title}>{title}</Text>
        <Text className={classes.description}>{description}</Text>
      </Container>
    </Card>
  );
};
