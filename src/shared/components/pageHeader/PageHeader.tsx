import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Container, Group, Button, Burger, Text, Transition, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { urls } from '@shared/config/urlConstants';

import { pageHeaderStyles } from './pageHeaderStyles';

interface HeaderActionProps {
  links?: { link: string; label: string }[];
}

export const PageHeader = ({ links }: HeaderActionProps) => {
  const history = useHistory();
  const { classes, cx } = pageHeaderStyles();
  const [opened, { toggle }] = useDisclosure(false);

  const clickTakeTest = () => {
    history.push(urls.careersTest);
  };

  const items = links?.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.mobileLink)}
      onClick={() => {
        toggle();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height="auto" py="xs" withBorder>
      <Container className={classes.inner}>
        <Group>
          {items && (
            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          )}
          <Text className={classes.logo}>LOGO HERE</Text>
        </Group>

        {links && (
          <Group spacing={5} className={classes.links}>
            {links.map((link) => (
              <a key={link.label} className={classes.link} href={`#${link.link}`}>
                {link.label}
              </a>
            ))}
          </Group>
        )}

        <Group>
          <Button variant="default">Login</Button>
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            onClick={clickTakeTest}
          >
            Get Started
          </Button>
        </Group>
      </Container>
      {items && (
        <Transition transition="pop-top-left" duration={200} mounted={opened}>
          {(styles) => (
            <Paper withBorder style={styles} sx={{ position: 'fixed', width: '100%' }} mt="xs">
              {items}
            </Paper>
          )}
        </Transition>
      )}
    </Header>
  );
};
