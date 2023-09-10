import { SalaryProgression } from '@datatypes/overview';
import { Badge, Card, Group, createStyles, rem } from '@mantine/core';
import React from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { getYLabel } from './salaryUtil';

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

export const BadgeItems = ({
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

export const TooltipContent = ({ payload }: TooltipProps<ValueType, NameType>) => {
  const { classes } = rendererStyles();
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

export const SalaryCard = ({
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
  const { classes } = rendererStyles();
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
