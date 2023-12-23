import { Button, Avatar, Menu } from '@mantine/core';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import classNames from 'classnames';

import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAppDispatch } from '@state/store';
import { setLoginModal } from '@slices/sessionSlice';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';

import { NavigationCenter } from './NavigationCenter';

import commonStyles from '@shared/styles/commonStyles.module.css';
import styles from './pageHeader.module.css';

interface IconButtonsProps {
  signOut: () => void;
  authenticated: boolean;
}

export const IconButtons = ({ signOut, authenticated }: IconButtonsProps) => {
  const dispatch = useAppDispatch();
  const { isMobile } = useMobileStyles();
  const { goToSettings } = usePageNavigation();

  const clickLogin = (initialState: 'signIn' | 'signUp') => {
    dispatch(setLoginModal({ open: true, initialState }));
  };

  const buttonSize = isMobile ? 'xs' : undefined;

  if (!authenticated) {
    return (
      <div className={styles.avatars}>
        <Button size={buttonSize} variant="outline" onClick={() => clickLogin('signIn')}>
          Login
        </Button>
        <Button size={buttonSize} onClick={() => clickLogin('signUp')}>
          Sign Up
        </Button>
      </div>
    );
  }
  return (
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
  );
};
