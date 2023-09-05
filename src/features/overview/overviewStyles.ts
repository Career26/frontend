import { createStyles, rem } from '@mantine/core';
import { HEADER_HEIGHT } from '@shared/components/pageHeader/pageHeaderStyles';

const NAVBAR_WIDTH = rem(250);

export const overviewStyles = createStyles((theme) => ({
  navBar: {
    width: NAVBAR_WIDTH,
    top: HEADER_HEIGHT,
    position: 'fixed',
    padding: '0 !important',
    height: '100%',
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
      color: 'white',
    },
  },

  active: {
    backgroundColor: theme.colors.blue[7],
    color: 'white',
    '&:hover': {
      backgroundColor: theme.colors.blue[4],
    },
  },

  icon: {
    paddingRight: rem(20),
  },

  pageContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: NAVBAR_WIDTH,
  },

  section: {
    marginBottom: '1000px',
    paddingLeft: rem(20),
    ':nth-of-type(odd)': {
      backgroundColor: theme.colors.red[0],
    },
    'a >': {
      marginTop: '2000px',
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
