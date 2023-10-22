import { Badge } from '@mantine/core';
import React from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { getYLabel } from './progressionUtil';
import styles from './careerProgressionStyles.module.scss';

export const TooltipContent = ({ payload }: TooltipProps<ValueType, NameType>) => {
  const item = payload?.[0]?.payload;
  if (!item) {
    return null;
  }
  const {
    age,
    value: [high, low],
  } = item;
  const average = (high + low) / 2;
  return (
    <div className={styles.tooltip}>
      <Badge size="md">Age: {age}</Badge>
      <Badge color="pink" size="sm">
        Max: {getYLabel(high)}
      </Badge>
      <Badge color="gray" size="sm">
        Min: {getYLabel(low)}
      </Badge>
      <Badge color="green" size="sm">
        Average: {getYLabel(average)}
      </Badge>
    </div>
  );
};
