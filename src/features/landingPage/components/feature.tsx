import React from 'react';
import { createStyles, Container, Text, rem, Image } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 0,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  textContainer: {
    flex: 3,
    padding: 0,
  },

  titleText: {
    paddingBottom: theme.spacing.sm,
    fontSize: rem(24),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center',
    },
  },

  descriptionText: {
    fontSize: rem(17),
    color: theme.colors.gray[7],
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center',
    },
  },

  image: {
    flex: 1,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,
    paddingRight: `calc(${theme.spacing.xl} * 2)`,
    [theme.fn.smallerThan('md')]: {
      maxWidth: rem(300),
      paddingBottom: theme.spacing.xl,
    },
  },
}));

interface FeatureComponentProps {
  title: string;
  description: string;
  image: string;
}

export const Feature = ({ title, description, image }: FeatureComponentProps) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.main}>
      <Image src={image} className={classes.image} />
      <Container className={classes.textContainer}>
        <Text className={classes.titleText}>{title}</Text>
        <Text className={classes.descriptionText}>{description}</Text>
      </Container>
    </Container>
  );
};
