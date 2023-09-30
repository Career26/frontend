import React from 'react';
import { createStyles, Card, Grid, Badge } from '@mantine/core';
import { CareerOverlap } from '@datatypes/overview';
import { cardStyles } from '@shared/styles/cardStyles';

const overlapsStyles = createStyles({
  gridContainer: {
    gap: '16px',
    justifyContent: 'center',
    display: 'flex',
  },
  reasonSection: {
    marginTop: '10px',
    width: '30vh',
    height: '20vh',
    padding: 0,
  },
});

export const OverlapsTile = ({ careerOverlaps }: { careerOverlaps: CareerOverlap[] }) => {
  const { classes } = overlapsStyles();
  const { classes: cardClasses } = cardStyles();
  return (
    <Grid className={classes.gridContainer}>
      {careerOverlaps.map((item) => (
        <Card key={item.career} shadow="md" radius="md" p="md" withBorder>
          <Card.Section className={cardClasses.cardHeader} withBorder>
            <Badge>{item.career}</Badge>
            <Badge color="pink">{item.industry}</Badge>
          </Card.Section>
          <div className={classes.reasonSection}>{item.reason}</div>
        </Card>
      ))}
    </Grid>
  );
};
