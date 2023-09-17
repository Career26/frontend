import { Paper } from '@mantine/core';
import React from 'react';

export const RoleOverviewTile = ({ roleSummary }: { roleSummary: string }) => (
  <Paper shadow="md" radius="md" p="md" withBorder>
    {roleSummary}
  </Paper>
);
