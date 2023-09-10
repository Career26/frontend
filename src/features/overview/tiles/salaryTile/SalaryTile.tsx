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
  Label,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

import { SalaryCard, TooltipContent } from './SalaryRenderers';
import { getGradient, getGradientLabel, getYLabel } from './salaryUtil';

type SalaryTileProps = {
  salaryProgression: SalaryProgression[];
};

const slaryStyles = createStyles({
  graphContainer: {
    width: '70%',
    height: 300,
    background: 'white',
    borderRadius: rem(10),
    padding: rem(10),
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: rem(10),
  },
  rowContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: rem(10),
  },
});

export const SalaryTile = ({ salaryProgression }: SalaryTileProps) => {
  const [finalMax, finalMin] = salaryProgression[salaryProgression.length - 1].value;
  const [startingMax, startingMin] = salaryProgression[0].value;
  const { classes } = slaryStyles();
  return (
    <>
      <div className={classes.leftContainer}>
        <div className={classes.rowContainer}>
          <SalaryCard header="Maximum Salaries" max={finalMax} min={finalMin} />
          <SalaryCard header="Starting Salaries" max={startingMax} min={startingMin} />
        </div>
        <SalaryCard
          header="Salary Progression"
          max={getGradient(finalMax, startingMax, salaryProgression)}
          min={getGradient(startingMax, startingMin, salaryProgression)}
          formatter={getGradientLabel}
        />
      </div>
      <div className={classes.graphContainer}>
        <ResponsiveContainer>
          <AreaChart data={salaryProgression}>
            <CartesianGrid strokeDasharray="3 3" />
            <Area type="monotone" dataKey="value" stroke="#228be6" fill="#d0ebff" />
            <XAxis dataKey="age">
              <Label value="Age (Years)" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis
              label={{ value: 'Salary', angle: -90, position: 'insideLeft' }}
              tickFormatter={getYLabel}
            />
            <ReferenceLine y={finalMax} stroke="green" strokeDasharray="3 3" label="Final Max" />
            <ReferenceLine
              y={startingMin}
              stroke="green"
              strokeDasharray="3 3"
              label="Starting Min"
            />
            <Tooltip content={TooltipContent} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
