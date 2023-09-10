import { SalaryProgression } from '@datatypes/overview';
import { Badge, Card, Group, createStyles, rem, Table } from '@mantine/core';
import React from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { getGradientLabel, getYLabel } from './salaryUtil';

const rendererStyles = createStyles((theme) => ({
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
}));

export const TooltipContent = ({ payload }: TooltipProps<ValueType, NameType>) => {
  const { classes } = rendererStyles();
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

type Row = { label: string; max: number; min: number; formatter: (value: number) => string };

export const SalaryCard = ({ header, rows }: { header: string; rows: Row[] }) => {
  const { classes } = rendererStyles();
  return (
    <Card>
      <Card.Section withBorder className={classes.cardHeader}>
        {header}
      </Card.Section>
      <Group className={classes.cardBody}>
        <Table>
          <thead>
            <tr>
              <th> </th>
              <th>Max</th>
              <th>Min</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>
                  <Badge color="pink" size="md">
                    {row.formatter(row.max)}
                  </Badge>
                </td>
                <td>
                  <Badge color="gray" size="md">
                    {row.formatter(row.min)}
                  </Badge>
                </td>
                <td>
                  <Badge color="green" size="md">
                    {row.formatter((row.max + row.min) / 2)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Group>
    </Card>
  );
};
