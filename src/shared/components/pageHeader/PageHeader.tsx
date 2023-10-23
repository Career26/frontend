import React from 'react';
import { Group, Button, Avatar, Menu, Container, Image } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAppDispatch } from '@state/store';
import { setLoginModal } from '@slices/sessionSlice';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import logo from '@assets/trans-bkg-navy-logo.png';

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
    <Container p={0}>
      <LoginModal />
      <Group justify="space-between" align="center">
        <Image
          src={logo}
          h={80}
          w="auto"
          fit="contain"
          onClick={goToHomepage}
          className={styles.logo}
        />
        <CareerNavigation />
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
    </Container>
  );
};
