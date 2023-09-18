import React from 'react';
import { Header, Group, Button, Text } from '@mantine/core';
import useCareerNavigation from '@shared/hooks/useCareerNavigation';

import { LoginModal } from '../login/LoginModal';
import { pageHeaderStyles } from './pageHeaderStyles';
import { NavigationCenter } from './NavigationCenter';
import { CareerNavigation } from './CareerNavigation';

export const PageHeader = () => {
  const { classes } = pageHeaderStyles();
  const { clickCareersTest, clickLogo } = useCareerNavigation();
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
        <Text className={classes.logo} onClick={clickLogo}>
          LOGO HERE
        </Text>
      </Group>

      <CareerNavigation />

      <Group>
        <NavigationCenter />
        <Button variant="default">Login</Button>
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          onClick={clickCareersTest}
        >
          Get Started
        </Button>
      </Group>
    </Header>
  );
};
