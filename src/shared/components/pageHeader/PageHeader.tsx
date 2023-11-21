import React from 'react';
import { Group, Image } from '@mantine/core';
import c26 from '@assets/career-26.png';
import logo from '@assets/logo.png';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';

import { LoginModal } from '../account/LoginModal';
import styles from './headerStyles.module.scss';
import { BurgerMenu } from '../burgerMenu/BurgerMenu';
import { CareerNavigation } from './CareerNavigation';
import { IconButtons } from './IconButtons';

export const PageHeader = ({
  signOut,
  authenticated,
  menu,
}: {
  signOut: () => void;
  authenticated: boolean;
  menu?: React.ReactNode;
}) => {
  const { isMobile } = useMobileStyles();
  const { goToHomepage } = usePageNavigation();

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <LoginModal />
      {menu && isMobile && <BurgerMenu menu={menu} />}
      <Group className={styles.logo} aria-label="logo-icon">
        <Image src={logo} h={25} onClick={goToHomepage} aria-label="logo-icon" />
        <Image src={c26} h={20} onClick={goToHomepage} aria-label="logo-text" />
      </Group>
      {!isMobile && <CareerNavigation />}
      <IconButtons signOut={signOut} authenticated={authenticated} />
    </div>
  );
};
