import { createStyles, rem } from '@mantine/core';
import { HEADER_HEIGHT } from '@shared/components/pageHeader/pageHeaderStyles';

const NAVBAR_WIDTH = rem(250);

export const overviewStyles = createStyles((theme) => ({
  content: {
    height: '420vh',
    flexDirection: 'column',
    paddingLeft: `${NAVBAR_WIDTH} !important`,
    paddingTop: HEADER_HEIGHT,
  },
  navBar: {
    width: NAVBAR_WIDTH,
    height: `calc(100% - ${HEADER_HEIGHT})`,
  },

  navLink: {
    display: 'flex',
    flexDirection: 'column',
    '> a': {
      textDecoration: 'none',
      ':not(:first-child)': { paddingTop: rem(20) },
      paddingLeft: rem(10),
      paddingRight: rem(10),
    },
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

  icon: {
    paddingRight: rem(20),
  },

  subHeader: {
    fontSize: rem(17),
    color: theme.colors.gray[7],
  },
}));
