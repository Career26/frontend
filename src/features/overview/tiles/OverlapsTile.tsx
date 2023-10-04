import React, { useEffect } from 'react';
import { createStyles, Grid } from '@mantine/core';
import { CareerOverlap } from '@datatypes/overview';
import { CareerCard } from '@shared/components/cards/CareerCard';
import { addIndustryColors, selectIndustryColors } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';

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
  const dispatch = useAppDispatch();
  const { classes } = overlapsStyles();
  const industryColors = useAppSelector(selectIndustryColors);

  useEffect(() => {
    const industries = careerOverlaps.map(({ industry }) => industry);
    dispatch(addIndustryColors(industries));
  }, [careerOverlaps]);

  return (
    <Grid className={classes.gridContainer}>
      {careerOverlaps.map((item) => (
        <div className={classes.cardContainer} key={item.career}>
          <CareerCard
            color={industryColors[item.industry]}
            title={item.career}
            badge={item.industry}
            content={item.reason}
          />
        </div>
      ))}
    </Grid>
  );
};
