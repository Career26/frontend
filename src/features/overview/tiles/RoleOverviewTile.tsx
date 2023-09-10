import { Card, CardSection, Grid, createStyles, rem } from '@mantine/core';
import React, { ReactNode } from 'react';

const roleStyles = createStyles((theme) => ({
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    '.mantine-Card-root': { height: '100%', width: '100%' },
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: rem(10),
    background: theme.colors.blue[4],
    color: 'white',
  },
}));

const GridItem = ({ children, header }: { header: string; children: ReactNode }) => {
  const { classes } = roleStyles();
  return (
    <Grid.Col span={6}>
      <Card shadow="md" radius="md" p="md" withBorder>
        <CardSection className={classes.cardHeader}>{header}</CardSection>
        {children}
      </Card>
    </Grid.Col>
  );
};

export const RoleOverviewTile = ({ roleSummary }: { roleSummary: string }) => {
  const { classes } = roleStyles();
  return (
    <Grid className={classes.gridContainer}>
      <GridItem header="Responsibilities">Responsibilities blah blah blah</GridItem>
      <GridItem header="Team">Team information blah blah blah</GridItem>
      <GridItem header="Skills">Skills blah blah blah</GridItem>
      <GridItem header="Daily Work">Daily work blah blah blah</GridItem>
    </Grid>
  );
};
