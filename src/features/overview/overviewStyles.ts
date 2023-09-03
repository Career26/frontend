import { createStyles, rem } from '@mantine/core';
import { HEADER_HEIGHT } from '@shared/components/pageHeader/pageHeaderStyles';

const NAVBAR_WIDTH = rem(200);

export const overviewStyles = createStyles((theme) => ({
  navBar: {
    width: NAVBAR_WIDTH,
    top: HEADER_HEIGHT,
    position: 'fixed',
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
    gap: rem(30),
    '> button': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  },

  pageContent: {
    display: 'flex',
    flexDirection: 'column',
    width: `calc(100% - ${NAVBAR_WIDTH})`,
    marginLeft: NAVBAR_WIDTH,
  },

  section: {
    marginBottom: '1000px',
    ':nth-child(odd)': {
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
