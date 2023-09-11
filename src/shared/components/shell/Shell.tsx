import React, { ReactElement } from 'react';
import { AppShell } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';

interface ShellProps {
  header?: ReactElement;
  children: ReactElement;
  navbar?: ReactElement;
}

export const Shell = ({ header, children, navbar }: ShellProps) => {
  usePageNavigation();
  return (
    <AppShell
      styles={{
        main: {
          paddingRight: '0',
          paddingLeft: '0',
          minHeight: 'auto',
        },
      }}
      header={header}
      navbar={navbar}
      navbarOffsetBreakpoint="sm"
    >
      {children}
    </AppShell>
  );
};
