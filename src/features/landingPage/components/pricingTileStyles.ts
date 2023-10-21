import { createStyles, rem } from '@mantine/core';

export const pricingTileStyles = createStyles((theme) => ({
  main: {
    display: flex;
    flex-direction: 'row',
    justifyContent: 'center',
    align-items: center;
    alignContent: 'center',
    padding: 0,
  },

  card: {
    background: theme.colors.blue[0],
    width: rem(330),
    borderRadius: 'sm',
    display: flex;
    flex-direction: column;
    align-items: center;

    [theme.fn.smallerThan('sm')]: {
      width: rem(300),
    },
  },

  priceText: {
    fontSize: rem(28),
    fontWeight: 800,
    lineHeight: 1.1,
    color: var(--mantine-color-gray-9);
  },

  benefitText: {
    fontSize: rem(17),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(15),
    },
  },

  benefitsContainer: {
    padding: 0,
    padding-top: theme.spacing.xs,
    padding-bottom: theme.spacing.xs,
  },

  benefitContainer: {
    display: flex;
    flex-direction: 'row',
    align-items: center;
    paddingLeft: 0,
    paddingRight: 0,
  },
}));
