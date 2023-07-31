import React from 'react';
import { useState } from 'react';
import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  rem,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(60),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
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
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderActionProps {
  links: { link: string; label: string }[];
}

export const SimpleHeader = ({ links }: HeaderActionProps) => {
  const { classes } = useStyles();

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Header height={HEADER_HEIGHT} py="sm" sx={{ borderBottom: 0 }}>
      <Container className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          <Text>C26</Text>
        </Group>
        <Group spacing={5} className={classes.links}>
          {links.map((link) => (
            <a className={classes.link} href={`#${link.link}`}>
              {link.label}
            </a>
          ))}
        </Group>
        <Group>
          <Button variant="default">Login</Button>
          <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            Get Started
          </Button>
        </Group>
      </Container>
    </Header>
  );
};
