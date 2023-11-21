import React from 'react';
import { Group, Image } from '@mantine/core';
import c26 from '@assets/career-26.png';
import logo from '@assets/logo.png';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAppDispatch } from '@state/store';
import { setLoginModal } from '@slices/sessionSlice';

import { LoginModal } from '../account/LoginModal';
import styles from './headerStyles.module.scss';
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';

export const PageHeader = ({
  signOut,
  authenticated,
}: {
  signOut: () => void;
  authenticated: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { isMobile } = useMobileStyles();
  const { goToHomepage } = usePageNavigation();
  const clickLogin = () => {
    dispatch(setLoginModal({ open: true, initialState: 'signIn' }));
  };
  return (
    <>
      <LoginModal />
      <Group w={200} className={styles.logo} aria-label="logo-icon">
        <Image src={logo} h={35} onClick={goToHomepage} aria-label="logo-icon" />
        <Image src={c26} h={25} onClick={goToHomepage} aria-label="logo-text" />
      </Group>

      {isMobile ? (
        <MobileMenu signOut={signOut} authenticated={authenticated} clickLogin={clickLogin} />
      ) : (
        <DesktopMenu clickLogin={clickLogin} signOut={signOut} authenticated={authenticated} />
      )}
    </>
  );
};
