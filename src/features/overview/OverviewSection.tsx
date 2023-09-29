import { createStyles, rem } from '@mantine/core';
import { TablerIconsProps } from '@tabler/icons-react';
import React, { ReactNode } from 'react';

const sectionStyles = createStyles((theme) => ({
  section: {
    '.mantine-Card-root': {
      borderRadius: rem(10),
    },
    paddingBottom: rem(20),
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
    justifyContent: 'space-around',
    gap: rem(20),
  },
}));

export const OverviewSection = ({
  label,
  anchor,
  Icon,
  children,
}: {
  label: string;
  anchor: string;
  Icon: (props: TablerIconsProps) => JSX.Element;
  children: ReactNode;
}) => {
  const { classes } = sectionStyles();
  return (
    <div className={classes.section} id={anchor}>
      <div className={classes.header}>
        <Icon size={50} />
        <h2>{label}</h2>
      </div>
      <div className={classes.body}>{children}</div>
    </div>
  );
};