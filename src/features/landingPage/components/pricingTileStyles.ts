import { createStyles, rem } from '@mantine/core';

export const pricingTileStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 0,
  },

  card: {
    background: theme.colors.blue[0],
    width: rem(330),
    borderRadius: 'sm',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [theme.fn.smallerThan('sm')]: {
      width: rem(300),
    },
  },

  priceText: {
    fontSize: rem(28),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
  },

  benefitText: {
    fontSize: rem(17),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(15),
    },
  },

  benefitsContainer: {
    padding: 0,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
  },

  benefitContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
}));
