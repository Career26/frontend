import { createStyles, rem } from '@mantine/core';
import { HEADER_HEIGHT } from '@shared/components/pageHeader/pageHeaderStyles';

const NAVBAR_WIDTH = rem(250);

export const overviewStyles = createStyles((theme) => ({
  content: {
    height: '350vh',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: `${NAVBAR_WIDTH} !important`,
  },
  navBar: {
    width: NAVBAR_WIDTH,
    top: HEADER_HEIGHT,
    padding: '0 !important',
    height: `calc(100% - ${HEADER_HEIGHT})`,
  },

  navLink: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0 !important',
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

  section: {
    height: '50vh',
    paddingLeft: rem(20),
    ':nth-of-type(odd)': {
      backgroundColor: theme.colors.red[0],
    },
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: rem(24),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
  },

  subHeader: {
    fontSize: rem(17),
    color: theme.colors.gray[7],
  },
}));
