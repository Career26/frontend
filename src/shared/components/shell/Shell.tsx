import React, { ReactElement } from 'react';
import { AppShell } from '@mantine/core';

interface ShellProps {
  header?: ReactElement;
  children: ReactElement;
  navbar?: ReactElement;
}

export const Shell = ({ header, children, navbar }: ShellProps) => (
  <AppShell
    styles={{
      main: {
        paddingRight: '0',
        paddingLeft: '0',
        minHeight: 'auto',
      },
    }}
    navbar={{ width: 300, breakpoint: 'sm' }}
  >
    <AppShell.Header>{header}</AppShell.Header>
    <AppShell.Navbar>{navbar}</AppShell.Navbar>
    {children}
  </AppShell>
);
