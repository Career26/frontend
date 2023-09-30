import { createStyles, rem } from '@mantine/core';

export const cardStyles = createStyles((theme) => ({
  cardContainer: {
    height: '50%',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: rem(10),
    background: theme.colors.blue[4],
    color: 'white',
  },
  cardBody: {
    paddingTop: rem(10),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: rem(20),
  },
}));
