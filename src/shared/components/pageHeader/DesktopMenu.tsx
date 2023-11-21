import React from 'react';
import { Button, Avatar, Menu } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import classNames from 'classnames';

import { NavigationCenter } from './NavigationCenter';
import { CareerNavigation } from './CareerNavigation';
import styles from './headerStyles.module.scss';

export const DesktopMenu = ({
  signOut,
  clickLogin,
  authenticated,
}: {
  clickLogin: () => void;
  signOut: () => void;
  authenticated: boolean;
}) => {
  const { clickCareersTest, goToSettings } = usePageNavigation();

  return (
    <>
      <CareerNavigation />
      {!authenticated ? (
        <div className={styles.avatars}>
          <Button variant="outline" onClick={clickLogin}>
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
