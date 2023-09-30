import { createStyles, rem } from '@mantine/core';

import { HEADER_HEIGHT } from './headerStyles';

export const NAVBAR_WIDTH = rem(250);

export const navStyles = createStyles((theme) => ({
  navBar: {
    width: NAVBAR_WIDTH,
    height: `calc(100% - ${HEADER_HEIGHT})`,
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
  },
  linkAction: {
    textDecoration: 'none',
    ':not(:first-of-type)': { paddingTop: rem(20) },
    paddingLeft: rem(10),
    paddingRight: rem(10),
  },
  navButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex',
    alignItems: 'center',
    width: '100%',
    height: rem(60),
    backgroundColor: 'white',
    color: theme.colors.gray[9],
    '&:hover': {
      backgroundColor: theme.colors.blue[1],
    },
  },
  active: {
    backgroundColor: theme.colors.blue[6],
    color: 'white',
    '&:hover': {
      backgroundColor: theme.colors.blue[4],
    },
  },
}));
