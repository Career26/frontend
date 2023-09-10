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
const getGradientLabel = (gradient: number) => `£${gradient} / year`;

const getGradient = (max: number, min: number, salaryProgression: SalaryProgression[]) => {
  const maxAge = Number(salaryProgression[salaryProgression.length - 1].age);
  const minAge = Number(salaryProgression[0].age);
  const years = maxAge - minAge;
  return (max - min) / years;
};

const BadgeItems = ({
  min,
  max,
  size = 'md',
  formatter = getYLabel,
}: {
  min: number;
  max: number;
  size?: string;
  formatter?: (value: number) => string;
}) => {
  const average = (max + min) / 2;
  return (
    <>
      <Badge color="pink" size={size}>
        Max: {formatter(max)}
      </Badge>
      <Badge color="gray" size={size}>
        Min: {formatter(min)}
      </Badge>
      <Badge color="green" size={size}>
        Average: {formatter(average)}
      </Badge>
    </>
  );
};

const getContent = ({ payload }: TooltipProps<ValueType, NameType>) => {
  const { classes } = slaryStyles();
  const item: SalaryProgression = payload?.[0]?.payload;
  if (!item) {
    return null;
  }
  const { value, age } = item;
  const [max, min] = value;
  return (
    <div className={classes.tooltip}>
      <Badge size="md">Age: {age}</Badge>
      <BadgeItems max={max} min={min} />
    </div>
  );
};

const SalaryCard = ({
  header,
  max,
  min,
  formatter,
}: {
  header: string;
  max: number;
  min: number;
  formatter?: (value: number) => string;
}) => {
  const { classes } = slaryStyles();
  return (
    <Card>
      <Card.Section withBorder className={classes.cardHeader}>
        {header}
      </Card.Section>
      <Group className={classes.cardBody}>
        <BadgeItems max={max} min={min} size="lg" formatter={formatter} />
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
            <Tooltip content={getContent} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
