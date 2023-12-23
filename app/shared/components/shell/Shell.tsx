import { ReactElement, useMemo } from 'react';
import { AppShell, ScrollArea, rem } from '@mantine/core';
import classNames from 'classnames';

import { useAppDispatch } from '@state/store';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { resetSession } from '@slices/sessionSlice';
import { useCareerTestStorage } from '@shared/hooks/useCareerTestStorage';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';

import { PageHeader } from '../pageHeader/PageHeader';
import { CareerNavigation } from '../pageHeader/CareerNavigation';
import { PageFooter } from '../pageFooter/PageFooter';

import styles from './shell.module.css';

interface ShellProps {
  children: ReactElement;
  navbar?: ReactElement;
}

const navWidth = 200;
const headerHeight = rem(80);
const footerHeight = rem(50);

interface NavMenuProps {
  navbar: ShellProps['navbar'];
}

const NavMenu = ({ navbar }: NavMenuProps) => (
  <ScrollArea h={`calc(100vh - ${headerHeight} - ${footerHeight})`}>{navbar}</ScrollArea>
);

export const Shell = ({ children, navbar }: ShellProps) => {
  const dispatch = useAppDispatch();
  const { isMobile } = useMobileStyles();
  const { authenticated, signOut } = useAuthUser();
  const { resetValues } = useCareerTestStorage();
  const { showNavigation } = usePageNavigation();

  const paddingTop = useMemo(() => {
    if (!isMobile) {
      return headerHeight;
    }
    if (!showNavigation) {
      return `calc(${headerHeight})`;
    }
    return `calc(${headerHeight} + ${rem(60)})`;
  }, [isMobile, showNavigation]);

  const onSignOut = () => {
    resetValues();
    dispatch(resetSession());
    signOut();
  };

  const { paddingLeft, navbarSettings } = useMemo(() => {
    if (isMobile || !navbar) {
      return { paddingLeft: 0, navbarSettings: undefined };
    }
    return {
      paddingLeft: navWidth,
      navbarSettings: { width: navWidth, breakpoint: 'sm' },
    };
  }, [isMobile, navbar]);

  return (
    <AppShell
      styles={{
        main: {
          backgroundColor: 'var(--mantine-color-gray-0)',
          height: '100%',
          paddingRight: '0',
          paddingLeft,
          paddingTop,
        },
      }}
      header={{ height: headerHeight }}
      navbar={navbarSettings}
      footer={{ height: footerHeight }}
    >
      <AppShell.Header className={styles.fullWidthContainer}>
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
      <AppShell.Main className={styles.main}>{children}</AppShell.Main>
      <AppShell.Footer className={classNames(styles.fullWidthContainer, styles.footer)}>
        <PageFooter />
      </AppShell.Footer>
    </AppShell>
  );
};
