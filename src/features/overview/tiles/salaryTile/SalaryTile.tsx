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

import { TooltipContent } from './TooltipContent';
import { getYLabel } from './salaryUtil';
import { ExpectedSalaryCard } from './ExpectedSalaryCard';

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
  const { classes } = slaryStyles();
  return (
    <>
      <div className={classes.leftContainer}>
        <Card>
          <ExpectedSalaryCard header="Expected Salaries" salaryProgression={salaryProgression} />
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
