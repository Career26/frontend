import { SalaryProgression } from '@datatypes/overview';
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
import styles from './careerProgressionStyles.module.scss';

export const SalaryChart = ({
  salaryProgression,
  minAge,
  maxAge,
}: {
  salaryProgression: SalaryProgression[];
  minAge?: string;
  maxAge?: string;
}) => (
  <div className={styles.graphContainer}>
    <ResponsiveContainer>
      <AreaChart
        data={salaryProgression.map(({ age, high, low }) => ({ age, value: [high, low] }))}
      >
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
