import { SalaryProgression } from '@datatypes/overview';
import { Card, createStyles, rem } from '@mantine/core';
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

import { SalaryCard, TooltipContent } from './SalaryRenderers';
import { getGradient, getGradientLabel, getYLabel } from './salaryUtil';

type SalaryTileProps = {
  salaryProgression: SalaryProgression[];
};

const slaryStyles = createStyles({
  graphContainer: {
    width: '60%',
    background: 'white',
    borderRadius: rem(10),
    padding: rem(10),
    height: '30vh',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '40%',
    height: '30vh',
  },
  rowContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: rem(10),
  },
});

export const SalaryTile = ({ salaryProgression }: SalaryTileProps) => {
  const [finalMax] = salaryProgression[salaryProgression.length - 1].value;
  const [startingMax, startingMin] = salaryProgression[0].value;
  const { classes } = slaryStyles();
  return (
    <>
      <div className={classes.leftContainer}>
        <Card>
          <SalaryCard
            header="Expected Salaries"
            rows={[
              {
                label: 'Starting Salary',
                formatter: getYLabel,
                max: startingMax,
                min: startingMin,
              },
              {
                label: 'Salary Progression',
                formatter: getGradientLabel,
                max: getGradient(finalMax, startingMax, salaryProgression),
                min: getGradient(startingMax, startingMin, salaryProgression),
              },
            ]}
          />
        </Card>
      </div>
      <div className={classes.graphContainer}>
        <ResponsiveContainer>
          <AreaChart data={salaryProgression}>
            <CartesianGrid strokeDasharray="3 3" />
            <Area type="monotone" dataKey="value" stroke="#228be6" fill="#228be6" />
            <XAxis dataKey="age" />
            <YAxis tickFormatter={getYLabel} />
            <Tooltip content={TooltipContent} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
