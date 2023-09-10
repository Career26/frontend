import { SalaryProgression } from '@datatypes/overview';
import { Card, Chip, Divider, Grid, createStyles, rem } from '@mantine/core';
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
  TooltipProps,
  ReferenceLine,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

type SalaryTileProps = {
  salaryProgression: SalaryProgression[];
};

const slaryStyles = createStyles((theme) => ({
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
  },
}));

const getYLabel = (salary: number) => `£${salary / 1000}K`;

const getContent = ({ payload }: TooltipProps<ValueType, NameType>) => {
  const { classes } = slaryStyles();
  const item: SalaryProgression = payload?.[0]?.payload;
  if (!item) {
    return null;
  }
  const { value, age } = item;
  const [max, min] = value;
  const average = (max + min) / 2;
  return (
    <div className={classes.tooltip}>
      Age: {age}
      <Divider />
      <div>Max: {getYLabel(max)}</div>
      <div>Min: {getYLabel(min)}</div>
      <Divider />
      Average: {getYLabel(average)}
    </div>
  );
};

export const SalaryTile = ({ salaryProgression }: SalaryTileProps) => {
  const [finalMax, finalMin] = salaryProgression[salaryProgression.length - 1].value;
  const [startingMax, startingMin] = salaryProgression[0].value;
  return (
    <>
      <Card>
        Maximum Salaries
        <Divider />
        <div>
          <Chip>Max: {getYLabel(finalMax)}</Chip>
          <Chip>Min: {getYLabel(finalMin)}</Chip>
        </div>
      </Card>
      <Card>
        Starting Salaries
        <Divider />
        <div>
          <Chip>Max: {getYLabel(startingMax)}</Chip>
          <Chip>Min: {getYLabel(startingMin)}</Chip>
        </div>
      </Card>
      <Card>
        <AreaChart
          data={salaryProgression}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
          height={300}
          width={500}
        >
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
          <Tooltip content={getContent} />
        </AreaChart>
      </Card>
    </>
  );
};

/*
<Card style={{ display: 'flex', flexDirection: 'column', width: '20%', gap: rem(20) }}>
        Maximum Salaries
        <Divider />
        <div>
          <Chip>Max: {getYLabel(finalMax)}</Chip>
          <Chip>Min: {getYLabel(finalMin)}</Chip>
        </div>
        <Divider />
        Starting Salaries
        <Divider />
        <div>
          <Chip>Max: {getYLabel(startingMax)}</Chip>
          <Chip>Min: {getYLabel(startingMin)}</Chip>
        </div>
      </Card
      */
