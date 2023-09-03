import React, { ReactElement } from 'react';
import { rem, AppShell, useMantineTheme } from '@mantine/core';

interface ShellProps {
  header?: ReactElement;
  children: ReactElement;
}

export const Shell = ({ header, children }: ShellProps) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          marginTop: rem(60),
          // paddingTop: `calc(${theme.spacing.xs} * 2)`,
          paddingRight: '0',
          paddingLeft: '0',
          minHeight: 'auto',
        },
      }}
      header={header}
    >
      {children}
    </AppShell>
  );
};
