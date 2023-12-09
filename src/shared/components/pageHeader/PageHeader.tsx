import React from 'react';
import { Image } from '@mantine/core';
import c26 from '@assets/career26.png';
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
    <div className={styles.headerContainer}>
      <LoginModal />
      {menu && isMobile && <BurgerMenu menu={menu} />}
      <div className={styles.logo}>
        <Image
          fit="contain"
          src={logo}
          w="auto"
          h={25}
          onClick={goToHomepage}
          aria-label="logo-icon"
        />
        <Image
          fit="contain"
          src={c26}
          w="auto"
          h={20}
          onClick={goToHomepage}
          aria-label="logo-text"
        />
      </div>
      {!isMobile && <CareerNavigation />}
      <IconButtons signOut={signOut} authenticated={authenticated} />
    </div>
  );
};
