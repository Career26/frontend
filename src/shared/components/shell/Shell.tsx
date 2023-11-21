import React, { ReactElement, useMemo } from 'react';
import { AppShell, ScrollArea, rem } from '@mantine/core';
import { useAppDispatch } from '@state/store';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { resetSession } from '@slices/sessionSlice';
import { useCareerTestStorage } from '@shared/hooks/useCareerTestStorage';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';

import { PageHeader } from '../pageHeader/PageHeader';
import styles from './shellStyles.module.scss';
import { CareerNavigation } from '../pageHeader/CareerNavigation';

interface ShellProps {
  children: ReactElement;
  navbar?: ReactElement;
}

const navWidth = 200;
const headerHeight = rem(80);

const NavMenu = ({ navbar }: { navbar: ShellProps['navbar'] }) => (
  <ScrollArea h={`calc(100vh - ${headerHeight})`}>{navbar}</ScrollArea>
);

export const Shell = ({ children, navbar }: ShellProps) => {
  const dispatch = useAppDispatch();
  const { isMobile } = useMobileStyles();
  const { authenticated, signOut } = useAuthUser();
  const { resetValues } = useCareerTestStorage();
  const { showNavigation } = usePageNavigation();

  const onSignOut = () => {
    resetValues();
    dispatch(resetSession());
    signOut();
  };
  const { paddingLeft, navbarSettings } = useMemo(() => {
    if (isMobile || !navbar) {
      return { paddingLeft: 0, navbarSettings: undefined };
    }
    return { paddingLeft: navWidth, navbarSettings: { width: navWidth, breakpoint: 'sm' } };
  }, [isMobile, navbar]);

  return (
    <AppShell
      styles={{
        main: {
          paddingRight: '0',
          paddingLeft,
          minHeight: 'auto',
          paddingTop: isMobile ? `calc(${headerHeight} + ${rem(60)})` : headerHeight,
        },
      }}
      header={{ height: headerHeight }}
      navbar={navbarSettings}
    >
      <AppShell.Header className={styles.header}>
        <PageHeader
          authenticated={authenticated}
          signOut={onSignOut}
          menu={navbar && <NavMenu navbar={navbar} />}
        />
      </AppShell.Header>
      {navbar && !isMobile && (
        <AppShell.Navbar display="flex" w={200}>
          <AppShell.Section>
            <NavMenu navbar={navbar} />
          </AppShell.Section>
        </AppShell.Navbar>
      )}
      {isMobile && showNavigation && (
        <div className={styles.careerNav} style={{ top: headerHeight }}>
          <CareerNavigation />
        </div>
      )}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
