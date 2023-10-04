import React from 'react';
import { Header, Group, Button, Text, Avatar, Menu } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAppDispatch } from '@state/store';
import { setLoginModal } from '@slices/sessionSlice';
import { IconLogout } from '@tabler/icons-react';
import { commonStyles } from '@shared/styles/commonStyles';

import { LoginModal } from '../login/LoginModal';
import { pageHeaderStyles } from './pageHeaderStyles';
import { NavigationCenter } from './NavigationCenter';
import { CareerNavigation } from './CareerNavigation';

export const PageHeader = ({
  signOut,
  authenticated,
}: {
  signOut: () => void;
  authenticated: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { classes: commonClasses } = commonStyles();
  const { classes } = pageHeaderStyles();
  const { clickCareersTest, goToHomepage } = usePageNavigation();

  const onClickLogin = () => {
    dispatch(setLoginModal({ open: true, initialState: 'signIn' }));
  };

  return (
    <Header
      height="auto"
      py="xs"
      withBorder
      style={{ position: 'fixed' }}
      className={classes.inner}
    >
      <LoginModal />
      <Group>
        <Text className={classes.logo} onClick={goToHomepage}>
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
              Get Started
            </Button>
          </>
        ) : (
          <>
            <NavigationCenter />
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar radius="xl" className={commonClasses.hoverIcon} />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Session</Menu.Label>
                <Menu.Item onClick={signOut} icon={<IconLogout className={classes.menuItemIcon} />}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        )}
      </Group>
    </Header>
  );
};
