import React from 'react';
import { Header, Group, Button, Text, Avatar, Menu, createStyles, rem } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAppDispatch } from '@state/store';
import { setLoginModal } from '@slices/sessionSlice';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import { commonStyles } from '@shared/styles/commonStyles';
import { HEADER_HEIGHT } from '@shared/styles/headerStyles';

import { LoginModal } from '../account/LoginModal';
import { NavigationCenter } from './NavigationCenter';
import { CareerNavigation } from './CareerNavigation';

const pageHeaderStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: rem(100),
    paddingRight: rem(100),
    backgroundColor: theme.colors.gray[1],
  },
  logo: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  menuItemIcon: {
    width: rem(14),
    height: rem(14),
  },
}));

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
  const { clickCareersTest, goToHomepage, goToSettings } = usePageNavigation();

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
              Take the Test
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
                <Menu.Item
                  onClick={goToSettings}
                  icon={<IconSettings className={classes.menuItemIcon} />}
                >
                  Account Settings
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        )}
      </Group>
    </Header>
  );
};
