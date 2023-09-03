import { createStyles, rem } from '@mantine/core';

export const overviewStyles = createStyles((theme) => ({
  section: {
    marginBottom: '24px',
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
