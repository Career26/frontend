import { Badge, Grid } from '@mantine/core';

import commonStyles from '@shared/styles/commonStyles.module.css';

interface TopEmployersTileProps {
  employers: string[];
}

export const TopEmployersTile = ({ employers }: TopEmployersTileProps) => (
  <Grid py="md" gutter="md" id="employers">
    {employers.map((employer) => (
      <Grid.Col key={employer} span={2}>
        <Badge size="lg" className={commonStyles.lightNavyBg}>
          {employer}
        </Badge>
      </Grid.Col>
    ))}
  </Grid>
);
