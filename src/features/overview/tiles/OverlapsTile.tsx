import React, { useEffect } from 'react';
import { Grid } from '@mantine/core';
import { CareerOverlap } from '@datatypes/overview';
import { CareerCard } from '@shared/components/cards/CareerCard';
import { addIndustryColors, selectIndustryColors } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';

import styles from '../overviewStyles.module.scss';

export const OverlapsTile = ({ careerOverlaps }: { careerOverlaps: CareerOverlap[] }) => {
  const dispatch = useAppDispatch();
  const industryColors = useAppSelector(selectIndustryColors);

  useEffect(() => {
    const industries = careerOverlaps.map(({ industry }) => industry);
    dispatch(addIndustryColors(industries));
  }, [careerOverlaps]);

  return (
    <Grid className={styles.gridContainer}>
      {careerOverlaps.map((item) => (
        <div className={styles.cardContainer} key={item.career}>
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
