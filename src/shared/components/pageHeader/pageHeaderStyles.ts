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
}));
