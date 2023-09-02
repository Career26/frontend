import { createStyles, rem } from '@mantine/core';

const HEADER_HEIGHT = rem(60);

export const pageHeaderStyles = createStyles((theme) => ({
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
