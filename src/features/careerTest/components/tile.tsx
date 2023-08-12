import React from 'react';

// external
import { Card, Text, createStyles, rem, Container, Badge, ActionIcon } from '@mantine/core';

interface ThemeProps {
  withSpacing: boolean;
  withBottomPadding: boolean;
}

const useStyles = createStyles((theme, { withSpacing, withBottomPadding }: ThemeProps) => ({
  card: {
    background: theme.colors.blue[0],
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: withSpacing ? theme.spacing.lg : 0,
    marginRight: withSpacing ? theme.spacing.lg : 0,
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      marginBottom: withBottomPadding ? theme.spacing.xl : 0,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
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
    paddingTop: theme.spacing.sm,

    [theme.fn.smallerThan('md')]: {
      marginLeft: 0,
      marginRight: 0,
      padding: 0,
    },
  },

  title: {
    paddingBottom: theme.spacing.sm,
    fontSize: rem(18),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
    textAlign: 'center',

    [theme.fn.smallerThan('md')]: {
      textAlign: 'left',
      paddingBottom: theme.spacing.xs,
    },
  },

  description: {
    fontSize: rem(15),
    textAlign: 'center',

    [theme.fn.smallerThan('md')]: {
      textAlign: 'left',
    },
  },
}));

interface TileComponentProps {
  withBottomPadding: boolean;
  withSpacing: boolean;
  title: string;
  description: string;
  icon: JSX.Element;
}

export const Tile = ({
  withBottomPadding,
  withSpacing,
  title,
  description,
  icon,
}: TileComponentProps) => {
  const { classes } = useStyles({ withSpacing, withBottomPadding });

  return (
    <Card className={classes.card}>
      <Container className={classes.iconContainer}>
        <ActionIcon color="blue">{icon}</ActionIcon>
      </Container>
      <Container className={classes.textContainer}>
        <Text className={classes.title}>{title}</Text>
        <Text className={classes.description}>{description}</Text>
      </Container>
    </Card>
  );
};
