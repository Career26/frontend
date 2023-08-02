import React from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Button,
  Burger,
  rem,
  Text,
  Transition,
  Paper,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  logo: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },

  mobileLink: {
    display: 'block',
    lineHeight: 1,
    textDecoration: 'none',
    color: theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
    borderRadius: 0,
    padding: theme.spacing.md,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },

    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },
}));

interface HeaderActionProps {
  links: { link: string; label: string }[];
  getStarted: () => void;
}

export const SimpleHeader = ({ links, getStarted }: HeaderActionProps) => {
  const { classes, cx } = useStyles();

  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={`#${link.link}`}
      className={cx(classes.mobileLink)}
      onClick={() => {
        toggle();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={HEADER_HEIGHT} py="sm" sx={{ borderBottom: 0 }}>
      <Container className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          <Text className={classes.logo}>LOGO HERE</Text>
        </Group>

        <Group spacing={5} className={classes.links}>
          {links.map((link) => (
            <a key={link.label} className={classes.link} href={`#${link.link}`}>
              {link.label}
            </a>
          ))}
        </Group>

        <Group>
          <Button variant="default">Login</Button>
          <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} onClick={getStarted}>
            Get Started
          </Button>
        </Group>
      </Container>

      <Transition transition="pop-top-left" duration={200} mounted={opened}>
        {(styles) => (
          <Paper withBorder style={styles}>
            {items}
          </Paper>
        )}
      </Transition>
    </Header>
  );
};
