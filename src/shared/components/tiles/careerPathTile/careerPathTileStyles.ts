import { createStyles, rem } from '@mantine/core';

export const careerPathTileStyles = createStyles((theme) => ({
  cardHeader: {
    background: theme.colors.blue[0],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  title: {
    fontSize: rem(18),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
    textAlign: 'center',

    [theme.fn.smallerThan('lg')]: {
      textAlign: 'left',
      paddingBottom: theme.spacing.xs,
    },
  },
  industrySection: {
    display: 'flex',
    placeContent: 'center',
    justifyContent: 'space-between',
  },
  careerSection: {
    overflow: 'hidden',
    paddingBottom: theme.spacing.md,
  },
  badgeList: {
    display: 'flex',
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    justifyContent: 'space-between',
    flexFlow: 'wrap',
  },
  modal: {
    '.mantine-Modal-header': {
      background: theme.colors.blue[0],
    },
  },
  cardContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));
