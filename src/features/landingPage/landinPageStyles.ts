import { createStyles, rem } from '@mantine/core';

export const landingPageStyles = createStyles((theme) => ({
  featuresContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    background: theme.colors.gray[0],
    padding: theme.spacing.xl,
    maxWidth: 'none',
  },

  pricingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.xl,
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
  },

  pricingText: {
    fontSize: rem(36),
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colors.gray[9],
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(30),
    },
  },

  pricingTierContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  pricingMargin: {
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.largerThan('md')]: {
      paddingRight: `calc(${theme.spacing.xl} * 2)`,
    },
  },
}));
