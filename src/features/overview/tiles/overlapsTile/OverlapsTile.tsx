import React from 'react';
import { createStyles, rem, Card, Grid, Badge } from '@mantine/core';
import { CareerOverlap } from '@datatypes/overview';

import './styles.scss';

const overlapsStyles = createStyles((theme) => ({
  gridContainer: {
    gap: '16px',
    justifyContent: 'center',
    display: 'flex',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: rem(10),
    background: theme.colors.gray[4],
    color: 'white',
  },
}));

export const OverlapsTile = ({ careerOverlaps }: { careerOverlaps: CareerOverlap[] }) => {
  const { classes } = overlapsStyles();
  return (
    <Grid className={classes.gridContainer}>
      {careerOverlaps.map((item) => (
        <Card key={item.career} shadow="md" radius="md" p="md" withBorder>
          <Card.Section component="div" className={classes.cardHeader} withBorder>
            <Badge>{item.career}</Badge>
            <Badge color="pink">{item.industry}</Badge>
          </Card.Section>
          <Card className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">Find out why</div>
              <div className="flip-card-back">{item.reason}</div>
            </div>
          </Card>
        </Card>
      ))}
    </Grid>
  );
};
