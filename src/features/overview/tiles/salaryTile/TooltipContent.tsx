import { SalaryProgression } from '@datatypes/overview';
import { Badge, createStyles, rem } from '@mantine/core';
import React from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { getGradientLabel, getYLabel } from './salaryUtil';

const tooltipStyles = createStyles((theme) => ({
  tooltip: {
    display: 'flex',
    fontSize: '14px',
    width: '100%',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    border: `1px solid ${theme.colors.gray[9]}`,
    backgroundColor: 'white',
    padding: rem(5),
    gap: rem(5),
    borderRadius: rem(10),
  },
}));

export const TooltipContent = ({ payload }: TooltipProps<ValueType, NameType>) => {
  const { classes } = tooltipStyles();
  const item: SalaryProgression = payload?.[0]?.payload;
  if (!item) {
    return null;
  }
  const { value, age } = item;
  const [max, min] = value;
  const average = (max + min) / 2;
  return (
    <div className={classes.tooltip}>
      <Badge size="md">Age: {age}</Badge>
      <Badge color="pink" size="sm">
        Max: {getYLabel(max)}
      </Badge>
      <Badge color="gray" size="sm">
        Min: {getYLabel(min)}
      </Badge>
      <Badge color="green" size="sm">
        Average: {getGradientLabel(average)}
      </Badge>
    </div>
  );
};
