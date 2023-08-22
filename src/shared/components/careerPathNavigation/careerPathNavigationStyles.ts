import { createStyles, rem } from '@mantine/core';

export const careerPathNavigationStyles = createStyles((theme) => ({
  header: { background: theme.colors.gray[0] },
  inner: {
    height: rem(40),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  pathSelector: {
    width: '100%',
    '.mantine-Select-root': {
      width: '100%',
    },
    [theme.fn.largerThan('md')]: {
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
      backgroundColor: theme.colors.blue[0],
    },
  },
}));
