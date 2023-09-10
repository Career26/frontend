import { SalaryProgression } from '@datatypes/overview';
import { Badge, Card, Group, createStyles, rem } from '@mantine/core';
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
    gap: rem(5),
    borderRadius: rem(10),
  },
  graphContainer: {
    width: '70%',
    height: 300,
    background: 'white',
    borderRadius: rem(10),
    padding: rem(10),
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: rem(10),
    background: theme.colors.blue[0],
  },
  cardBody: {
    paddingTop: rem(10),
    display: 'flex',
    justifyContent: 'center',
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
}));

const getYLabel = (salary: number) => `£${salary / 1000}K`;

const getSalaryGradient = (max: number, min: number, salaryProgression: SalaryProgression[]) => {
  const maxAge = Number(salaryProgression[salaryProgression.length - 1].age);
  const minAge = Number(salaryProgression[0].age);
  const years = maxAge - minAge;
  const gradient = (max - min) / years;
  return `£${gradient} / year`;
};

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
      <Badge size="md">Age: {age}</Badge>
      <Badge color="pink" size="md">
        Max: {getYLabel(max)}
      </Badge>
      <Badge color="gray" size="md">
        Min: {getYLabel(min)}
      </Badge>
      <Badge color="green" size="md">
        Average: {getYLabel(average)}
      </Badge>
    </div>
  );
};

const SalaryCard = ({
  header,
  max,
  min,
}: {
  header: string;
  max: string | number;
  min: string | number;
}) => {
  const { classes } = slaryStyles();
  return (
    <Card>
      <Card.Section withBorder className={classes.cardHeader}>
        {header}
      </Card.Section>
      <Group className={classes.cardBody}>
        <Badge color="pink" size="lg">
          Max: {max}
        </Badge>
        <Badge color="gray" size="lg">
          Min: {min}
        </Badge>
      </Group>
    </Card>
  );
};

export const SalaryTile = ({ salaryProgression }: SalaryTileProps) => {
  const [finalMax, finalMin] = salaryProgression[salaryProgression.length - 1].value;
  const [startingMax, startingMin] = salaryProgression[0].value;
  const { classes } = slaryStyles();
  return (
    <>
      <div className={classes.leftContainer}>
        <div className={classes.rowContainer}>
          <SalaryCard
            header="Maximum Salaries"
            max={getYLabel(finalMax)}
            min={getYLabel(finalMin)}
          />
          <SalaryCard
            header="Starting Salaries"
            max={getYLabel(startingMax)}
            min={getYLabel(startingMin)}
          />
        </div>
        <SalaryCard
          header="Salary Progression"
          max={getSalaryGradient(finalMax, startingMax, salaryProgression)}
          min={getSalaryGradient(startingMax, startingMin, salaryProgression)}
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
            <Tooltip content={getContent} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
