import { Badge, Grid } from '@mantine/core';
import React from 'react';
import commonStyles from '@shared/styles/commonStyles.module.scss';

export const TopEmployersTile = ({ employers }: { employers: string[] }) => (
  <Grid py="md" gutter="md" grow id="employers">
    {employers.map((employer) => (
      <Grid.Col key={employer} span={2}>
        <Badge size="lg" className={commonStyles.lightNavyBg}>
          {employer}
        </Badge>
      </Grid.Col>
    ))}
  </Grid>
);
