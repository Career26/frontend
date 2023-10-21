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
    display: flex;
    flex-direction: column;
  },
  linkAction: {
    textDecoration: 'none',
    paddingLeft: rem(10),
    paddingRight: rem(10),
  },
  navButton: {
    display: flex;
    flex-direction: 'row',
    justifyContent: 'flex',
    align-items: center;
    width: '100%',
    height: rem(60),
    backgroundColor: 'white',
    color: var(--mantine-color-gray-9);
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
