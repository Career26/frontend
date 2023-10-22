import { Badge, Grid } from '@mantine/core';
import React from 'react';

export const TopEmployersTile = ({ employers }: { employers: string[] }) => (
  <Grid py="md" gutter="md" grow>
    {employers.map((employer) => (
      <Grid.Col key={employer} span={2}>
        <Badge size="lg">{employer}</Badge>
      </Grid.Col>
    ))}
  </Grid>
);
