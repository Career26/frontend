import { Card, createStyles, rem } from '@mantine/core';
import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';

const sectionStyles = createStyles((theme) => ({
  section: {
    height: '50vh',
    paddingLeft: rem(20),
    ':nth-of-type(even)': {
      '.mantine-Card-root': {
        backgroundColor: theme.colors.gray[0],
      },
    },
    ':nth-of-type(odd)': {
      backgroundColor: theme.colors.gray[0],
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: rem(24),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
    gap: rem(10),
  },
  body: {
    paddingRight: rem(20),
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    gap: rem(20),
  },
  card: {
    width: '50%',
  },
}));

export const OverviewSection = ({
  label,
  anchor,
  Icon,
}: {
  label: string;
  anchor: string;
  Icon: (props: TablerIconsProps) => JSX.Element;
}) => {
  const { classes } = sectionStyles();
  return (
    <div className={classes.section} id={anchor}>
      <div className={classes.header}>
        <Icon size={50} />
        <h2>{label}</h2>
      </div>
      <div className={classes.body}>
        <Card withBorder radius={5} className={classes.card}>
          Item 1
        </Card>
        <Card withBorder radius={5} className={classes.card}>
          Item 2
        </Card>
      </div>
    </div>
  );
};
