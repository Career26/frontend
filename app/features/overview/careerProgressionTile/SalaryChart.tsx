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

import type { SalaryProgression } from '@datatypes/overview';

import styles from './careerProgression.module.css';

interface SalaryChartProps {
  salaryProgression: SalaryProgression[];
  minAge?: string;
  maxAge?: string;
}

export const SalaryChart = ({ salaryProgression, minAge, maxAge }: SalaryChartProps) => (
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
