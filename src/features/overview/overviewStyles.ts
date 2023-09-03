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
    borderRight: `solid 1px ${theme.colors.gray[9]}`,
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0 !important',
    '> a': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      textDecoration: 'none',
      background: theme.colors.gray[0],
      height: rem(60),
      color: theme.colors.gray[9],
      borderBottom: `solid 1px ${theme.colors.gray[9]}`,
      '&:hover': {
        background: theme.colors.gray[3],
      },
    },
  },

  icon: {
    paddingRight: rem(30),
    paddingLeft: rem(20),
  },

  pageContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: NAVBAR_WIDTH,
  },

  section: {
    marginBottom: '1000px',
    paddingLeft: rem(20),
    ':nth-child(odd)': {
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
