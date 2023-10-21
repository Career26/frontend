import React, { ReactElement } from 'react';
import { AppShell } from '@mantine/core';
import { useAppDispatch } from '@state/store';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { resetSession } from '@slices/sessionSlice';
import navStyles from '@shared/styles/navStyles.module.scss';

import { PageHeader } from '../pageHeader/PageHeader';

interface ShellProps {
  children: ReactElement;
  navbar?: ReactElement;
}

export const Shell = ({ children, navbar }: ShellProps) => {
  const dispatch = useAppDispatch();
  const { authenticated, signOut } = useAuthUser();

  return (
    <AppShell
      styles={{
        main: {
          paddingRight: '0',
          paddingLeft: '0',
          minHeight: 'auto',
        },
      }}
      navbar={{ width: navbar ? 300 : 0, breakpoint: 'sm' }}
    >
      <AppShell.Header>
        <PageHeader
          authenticated={authenticated}
          signOut={() => {
            dispatch(resetSession());
            signOut();
          }}
        />
      </AppShell.Header>
      <AppShell.Navbar p="xs" className={navStyles.navBar}>
        <AppShell.Section grow mt="md" className={navStyles.navLink}>
          {navbar}
        </AppShell.Section>
      </AppShell.Navbar>
      {children}
    </AppShell>
  );
};
