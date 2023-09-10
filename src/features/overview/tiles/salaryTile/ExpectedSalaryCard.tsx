import { SalaryProgression } from '@datatypes/overview';
import { Badge, Card, Group, createStyles, rem, Table } from '@mantine/core';
import React from 'react';

import { getGradient, getGradientLabel, getYLabel } from './salaryUtil';

const expectedSalaryCardStyles = createStyles((theme) => ({
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

export const ExpectedSalaryCard = ({
  header,
  salaryProgression,
}: {
  header: string;
  salaryProgression: SalaryProgression[];
}) => {
  const { classes } = expectedSalaryCardStyles();
  const [finalMax] = salaryProgression[salaryProgression.length - 1].value;
  const [startingMax, startingMin] = salaryProgression[0].value;
  const rows = [
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
  ];
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
