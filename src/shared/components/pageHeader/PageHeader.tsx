import React from 'react';
import { Group, Button, Avatar, Menu, Image, Burger } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAppDispatch } from '@state/store';
import { setLoginModal } from '@slices/sessionSlice';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import c26 from '@assets/career-26.png';
import logo from '@assets/logo.png';
import classNames from 'classnames';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';
import { useDisclosure } from '@mantine/hooks';

import { LoginModal } from '../account/LoginModal';
import { NavigationCenter } from './NavigationCenter';
import { CareerNavigation } from './CareerNavigation';
import styles from './headerStyles.module.scss';

export const PageHeader = ({
  signOut,
  authenticated,
  menu,
}: {
  signOut: () => void;
  authenticated: boolean;
  menu?: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const [opened, { toggle }] = useDisclosure();
  const { isMobile } = useMobileStyles();
  const { clickCareersTest, showNavigation, goToHomepage, goToSettings } = usePageNavigation();

  const showLogo = !menu || !isMobile;
  const showC26 = !isMobile || (!menu && !showNavigation);
  const showMenu = !!menu && isMobile;

  const onClickLogin = () => {
    dispatch(setLoginModal({ open: true, initialState: 'signIn' }));
  };

  return (
    <>
      <LoginModal />
      {showLogo && (
        <Group onClick={goToHomepage} className={styles.logo} aria-label="logo-icon">
          <Image src={logo} h={35} />
          {showC26 && <Image src={c26} h={25} />}
        </Group>
      )}
      {showMenu && (
        <Menu width={300} data-testid="header-menu" opened={opened} onChange={toggle}>
          <Menu.Target>
            <Burger opened={opened} onClick={toggle} />
          </Menu.Target>
          <Menu.Dropdown>{menu}</Menu.Dropdown>
        </Menu>
      )}
      <CareerNavigation />
      {!authenticated ? (
        <div className={styles.avatars}>
          <Button variant="outline" onClick={onClickLogin}>
            Login
          </Button>
          <Button onClick={clickCareersTest}>Take the Test</Button>
        </div>
      ) : (
        <div className={styles.avatars}>
          <NavigationCenter />
          <Menu width={200} data-testid="user-menu">
            <Menu.Target>
              <Avatar
                radius="xl"
                className={classNames(commonStyles.hoverItem, commonStyles.navyBg)}
                color="white"
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Session</Menu.Label>
              <Menu.Item onClick={signOut} leftSection={<IconLogout />}>
                Logout
              </Menu.Item>
              <Menu.Item onClick={goToSettings} leftSection={<IconSettings />}>
                Account Settings
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      )}
    </>
  );
};
