import { createStyles, rem } from '@mantine/core';

export const HEADER_HEIGHT = rem(60);

export const pageHeaderStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: rem(100),
    paddingRight: rem(100),
  },
  logo: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  userAvatar: {
    '&:hover': {
      color: 'red',
      cursor: 'pointer',
      boxShadow:
        '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.25rem 1.5625rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.625rem 0.625rem -0.3125rem',
    },
  },
  menuItemIcon: {
    width: rem(14),
    height: rem(14),
  },
}));
