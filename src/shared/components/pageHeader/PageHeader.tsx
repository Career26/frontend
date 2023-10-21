import React from 'react';
import { Group, Button, Text, Avatar, Menu, AppShellHeader } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAppDispatch } from '@state/store';
import { setLoginModal } from '@slices/sessionSlice';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import commonStyles from '@shared/styles/commonStyles.module.scss';

import { LoginModal } from '../account/LoginModal';
import { NavigationCenter } from './NavigationCenter';
import { CareerNavigation } from './CareerNavigation';
import styles from './pageHeaderStyles.module.scss';

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
    <AppShellHeader
      h="auto"
      py="xs"
      withBorder
      style={{ position: 'fixed' }}
      className={styles.inner}
    >
      <LoginModal />
      <Group>
        <Text className={styles.logo} onClick={goToHomepage}>
          LOGO HERE
        </Text>
      </Group>

      <CareerNavigation />

      <Group>
        {!authenticated ? (
          <>
            <Button variant="default" onClick={onClickLogin}>
              Login
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              onClick={clickCareersTest}
            >
              Take the Test
            </Button>
          </>
        ) : (
          <>
            <NavigationCenter />
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar radius="xl" className={commonStyles.hoverIcon} />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Session</Menu.Label>
                <Menu.Item
                  onClick={signOut}
                  leftSection={<IconLogout className={styles.menuItemIcon} />}
                >
                  Logout
                </Menu.Item>
                <Menu.Item
                  onClick={goToSettings}
                  leftSection={<IconSettings className={styles.menuItemIcon} />}
                >
                  Account Settings
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        )}
      </Group>
    </AppShellHeader>
  );
};
