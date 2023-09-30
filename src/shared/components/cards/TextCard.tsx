import { Card, createStyles, rem } from '@mantine/core';
import React from 'react';

const textCardStyles = createStyles({
  cardContainer: {
    width: '35vh',
  },
  cardDescription: {
    padding: rem(10),
    textAlign: 'left',
  },
  descriptionsContainer: {
    display: 'flex',
    gap: '24px',
  },
});

export const TextCard = ({ content }: { content: React.ReactNode }) => {
  const { classes } = textCardStyles();
  return (
    <Card className={classes.cardContainer} shadow="md" radius="md" p="md" withBorder>
      <div className={classes.cardDescription}>{content}</div>
    </Card>
  );
};
