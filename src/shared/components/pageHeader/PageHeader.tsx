import React from 'react';
import { Group, Button, Text, Avatar, Menu, Container } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAppDispatch } from '@state/store';
import { setLoginModal } from '@slices/sessionSlice';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import commonStyles from '@shared/styles/commonStyles.module.scss';

import { LoginModal } from '../account/LoginModal';
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

  const { clickCareersTest, goToHomepage, goToSettings } = usePageNavigation();

  const onClickLogin = () => {
    dispatch(setLoginModal({ open: true, initialState: 'signIn' }));
  };

  return (
    <Container>
      <Group justify="space-between" align="center" p="lg">
        <LoginModal />
        <Group>
          <Text className={commonStyles.hoverItem} onClick={goToHomepage}>
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
