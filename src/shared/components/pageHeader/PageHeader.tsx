import React from 'react';
import { Group, Button, Avatar, Menu, Image } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAppDispatch } from '@state/store';
import { setLoginModal } from '@slices/sessionSlice';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import logo from '@assets/logo.png';
import c26 from '@assets/career-26.png';

import { LoginModal } from '../account/LoginModal';
import { NavigationCenter } from './NavigationCenter';
import { CareerNavigation } from './CareerNavigation';
import styles from './headerStyles.module.scss';

export const PageHeader = ({
  signOut,
  authenticated,
}: {
  signOut: () => void;
  authenticated: boolean;
}) => {
  const dispatch = useAppDispatch();

  const { clickCareersTest, goToHomepage, goToSettings } = usePageNavigation();

  const onClickLogin = () => {
    dispatch(setLoginModal({ open: true, initialState: 'signIn' }));
  };

  return (
    <>
      <LoginModal />
      <Group onClick={goToHomepage} className={styles.logo}>
        {/* <Image src={logo} h={20} /> */}
        <Image src={c26} h={25} />
      </Group>
      <CareerNavigation />
      <Group justify="space-between" align="center" display="flex">
        <Group>
          {!authenticated ? (
            <>
              <Button variant="default" onClick={onClickLogin}>
                Login
              </Button>
              <Button variant="gradient" onClick={clickCareersTest}>
                Take the Test
              </Button>
            </>
          ) : (
            <>
              <NavigationCenter />
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Avatar radius="xl" className={commonStyles.hoverItem} />
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
            </>
          )}
        </Group>
      </Group>
    </>
  );
};
