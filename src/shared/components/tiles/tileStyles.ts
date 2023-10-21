import { createStyles, rem } from '@mantine/core';

interface ThemeProps {
  withSpacing?: boolean;
  withBottomPadding?: boolean;
}

export const tileStyles = createStyles((theme, { withSpacing, withBottomPadding }: ThemeProps) => ({
  card: {
    background: theme.colors.blue[0],
    display: flex;
    align-items: center;
    flex-direction: column;
    marginLeft: withSpacing ? theme.spacing.lg : 0,
    marginRight: withSpacing ? theme.spacing.lg : 0,
    flex: 1,
    [theme.fn.smallerThan('md')]: {
      marginBottom: withBottomPadding ? var(--mantine-spacing-xl); : 0,
      flex-direction: 'row',
      width: '100%',
      align-items: center;
      marginLeft: 0,
      marginRight: 0,
    },
  },
  iconContainer: {
    margin: 0,
    paddingLeft: theme.spacing.sm,
    paddingRight: `calc(${theme.spacing.sm} * 2)`,
  },
  textContainer: {
    padding-top: theme.spacing.sm,
    [theme.fn.smallerThan('md')]: {
      marginLeft: 0,
      marginRight: 0,
      padding: 0,
    },
  },
  title: {
    padding-bottom: theme.spacing.sm,
    fontSize: rem(18),
    fontWeight: 800,
    lineHeight: 1.1,
    color: var(--mantine-color-gray-9);
    text-align: 'center',

    [theme.fn.smallerThan('md')]: {
      text-align: 'left',
      padding-bottom: theme.spacing.xs,
    },
  },
  description: {
    fontSize: rem(15),
    text-align: 'center',
    [theme.fn.smallerThan('md')]: {
      text-align: 'left',
    },
  },
}));
