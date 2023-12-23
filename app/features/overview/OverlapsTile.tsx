import { useEffect } from 'react';
import { Badge, Card, Grid, Group, Text } from '@mantine/core';

import { addIndustryColors, selectIndustryColors } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';

import type { CareerOverlap } from '@datatypes/overview';

import commonStyles from '@shared/styles/commonStyles.module.css';

interface OverlapsTileProps {
  careerOverlaps: CareerOverlap[];
}

export const OverlapsTile = ({ careerOverlaps }: OverlapsTileProps) => {
  const dispatch = useAppDispatch();
  const industryColors = useAppSelector(selectIndustryColors);

  useEffect(() => {
    const industries = careerOverlaps.map(({ industry }) => industry);
    dispatch(addIndustryColors(industries));
  }, [careerOverlaps]);

  return (
    <Grid py="sm" grow id="overlaps">
      {careerOverlaps.map((item) => (
        <Grid.Col span={{ md: 6 }} key={`overlap-${item.career}`}>
          <Card padding="lg" radius="md" withBorder h="100%">
            <Card.Section withBorder inheritPadding py="xs" className={commonStyles.lightNavyBg}>
              <Group justify="space-between">
                <Text fw="bold">{item.career}</Text>
                <Badge color={industryColors[item.industry]}>{item.industry}</Badge>
              </Group>
            </Card.Section>
            <Text py="sm">{item.reason}</Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};
