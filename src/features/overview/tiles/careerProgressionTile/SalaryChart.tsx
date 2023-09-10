import { SalaryProgression } from '@datatypes/overview';
import { createStyles, rem } from '@mantine/core';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import { TooltipContent } from './TooltipContent';
import { getVerticalFill, getYLabel } from './progressionUtil';

const salaryChartStyles = createStyles({
  graphContainer: {
    width: '50%',
    background: '#f8f9fa',
    borderRadius: rem(10),
    padding: rem(10),
  },
});

export const SalaryChart = ({
  salaryProgression,
  minAge,
  maxAge,
}: {
  salaryProgression: SalaryProgression[];
  minAge?: string;
  maxAge?: string;
}) => {
  const { classes } = salaryChartStyles();
  return (
    <div className={classes.graphContainer}>
      <ResponsiveContainer>
        <AreaChart data={salaryProgression}>
          <CartesianGrid
            strokeDasharray="3 3"
            verticalFill={getVerticalFill(salaryProgression, minAge, maxAge)}
          />
          <Area type="monotone" dataKey="value" stroke="#228be6" fill="#228be6" />
          <XAxis dataKey="age" />
          <YAxis tickFormatter={getYLabel} />
          <Tooltip content={TooltipContent} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
