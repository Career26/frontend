import React, { ReactElement } from 'react';
import { AppShell, ScrollArea, rem } from '@mantine/core';
import { useAppDispatch } from '@state/store';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { resetSession } from '@slices/sessionSlice';
import { useCareerTestStorage } from '@careerTest/hooks/useCareerTestStorage';

import { PageHeader } from '../pageHeader/PageHeader';

interface ShellProps {
  children: ReactElement;
  navbar?: ReactElement;
}

const navWidth = 200;
const headerHeight = rem(80);

export const Shell = ({ children, navbar }: ShellProps) => {
  const dispatch = useAppDispatch();
  const { authenticated, signOut } = useAuthUser();
  const { resetValues } = useCareerTestStorage();
  const onSignOut = () => {
    resetValues();
    dispatch(resetSession());
    signOut();
  };
  return (
    <AppShell
      styles={{
        main: {
          paddingRight: '0',
          paddingLeft: navbar ? navWidth : 0,
          minHeight: 'auto',
          paddingTop: headerHeight,
        },
      }}
      header={{ height: headerHeight }}
      navbar={{ width: navWidth, breakpoint: 'sm' }}
    >
      <AppShell.Header>
        <PageHeader authenticated={authenticated} signOut={onSignOut} />
      </AppShell.Header>
      <AppShell.Navbar display={!navbar ? 'none' : 'flex'}>
        <AppShell.Section>
          <ScrollArea h={`calc(100vh - ${headerHeight})`}>{navbar}</ScrollArea>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
