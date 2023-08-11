import React from 'react';

// external
import { Card, Text, createStyles, rem, Image, Container, Badge } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    background: theme.colors.blue[0],
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    width: 'calc(33.33333%)',

    [theme.fn.smallerThan('sm')]: {
      margin: 'auto',
      marginBottom: theme.spacing.xl,
      flexDirection: 'row',
      width: '100%',
    },
  },

  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      marginLeft: 0,
    },
  },

  badge: {
    paddingBottom: theme.spacing.md,
  },

  title: {
    paddingBottom: theme.spacing.md,
    fontSize: rem(18),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },

  description: {
    fontSize: rem(15),
    textAlign: 'center',
  },

  image: {
    maxWidth: 190,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: 120,
    },
  },
}));

interface TileComponentProps {
  number: number;
  title: string;
  description: string;
  image: string;
}

export const Tile = ({ number, title, description, image }: TileComponentProps) => {
  const { classes } = useStyles();

  return (
    <Card className={classes.card}>
      <Image src={image} className={classes.image} />
      <Container className={classes.textContainer}>
        <Badge className={classes.badge} size="xl" radius="sm" variant="light">
          {number}
        </Badge>
        <Text className={classes.title}>{title}</Text>
        <Text className={classes.description}>{description}</Text>
      </Container>
    </Card>
  );
};
