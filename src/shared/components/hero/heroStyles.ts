import { createStyles, rem } from '@mantine/core';

export const heroStyles = createStyles((theme, grayBackground?: boolean) => ({
  main: {
    padding: theme.spacing.xl,
    paddingTop: rem(80),
    paddingBottom: rem(80),
    maxWidth: 'none',
    background: grayBackground ? theme.colors.gray[0] : theme.white,

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(40),
      paddingTop: rem(40),
    },
  },

  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    padding: 0,
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column-reverse',
    },
  },

  titleContainer: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },

  title: {
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.black,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(20),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  image: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,
    paddingRight: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  imageMobileContainer: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  imageMobile: {
    display: 'flex',
    flex: 1,
    alignSelf: 'center',

    [theme.fn.smallerThan('sm')]: {
      marginTop: `calc(${theme.spacing.xl} * 2)`,
      marginBottom: `calc(${theme.spacing.xl} * 2)`,
      maxWidth: rem(350),
    },

    [theme.fn.smallerThan('xs')]: {
      maxWidth: rem(250),
    },

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  controlContainer: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: 0,
    },
  },

  button: {
    [theme.fn.smallerThan('sm')]: {
      flex: 1,
    },
  },
}));
