import React from 'react';
import { Header, Container, Group, Button, Burger, Text, Transition, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';

import { pageHeaderStyles } from './pageHeaderStyles';

interface HeaderActionProps {
  links?: { link: string; label: string }[];
}

export const PageHeader = ({ links }: HeaderActionProps) => {
  const { classes, cx } = pageHeaderStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const { goToCareerTest, clickLogo } = usePageNavigation();

  const MenuItems = links?.map((link) => (
    <a key={link.label} href={link.link} className={cx(classes.mobileLink)} onClick={toggle}>
      {link.label}
    </a>
  ));

  const HeaderItems = links?.map((link) => (
    <a key={link.label} className={classes.link} href={`#${link.link}`}>
      {link.label}
    </a>
  ));

  return (
    <Header height="auto" py="xs" withBorder>
      <Container className={classes.inner}>
        <Group>
          {links?.length && (
            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          )}
          <Text className={classes.logo} onClick={clickLogo}>
            LOGO HERE
          </Text>
        </Group>

        {links?.length && (
          <Group spacing={5} className={classes.links}>
            {HeaderItems}
          </Group>
        )}

        <Group>
          <Button variant="default">Login</Button>
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            onClick={goToCareerTest}
          >
            Get Started
          </Button>
        </Group>
      </Container>

      {links?.length && (
        <Transition transition="pop-top-left" duration={200} mounted={opened}>
          {(styles) => (
            <Paper withBorder style={styles} sx={{ position: 'fixed', width: '100%' }} mt="xs">
              {MenuItems}
            </Paper>
          )}
        </Transition>
      )}
    </Header>
  );
};
