import React from 'react';
import { createStyles, Grid } from '@mantine/core';
import { CareerOverlap } from '@datatypes/overview';
import { CareerCard } from '@shared/components/cards/CareerCard';

const overlapsStyles = createStyles({
  gridContainer: {
    gap: '16px',
    justifyContent: 'center',
    display: 'flex',
  },
  cardContainer: {
    width: '50vh',
  },
});

export const OverlapsTile = ({ careerOverlaps }: { careerOverlaps: CareerOverlap[] }) => {
  const { classes } = overlapsStyles();
  return (
    <Grid className={classes.gridContainer}>
      {careerOverlaps.map((item) => (
        <div className={classes.cardContainer} key={item.career}>
          <CareerCard title={item.career} badge={item.industry} content={item.reason} />
        </div>
      ))}
    </Grid>
  );
};
