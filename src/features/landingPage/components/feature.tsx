import React from 'react';
import { createStyles, Container, Text, rem, Image } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 0,
    paddingTop: `calc(${theme.spacing.xl} * 1.5)`,
    paddingBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  textContainer: {
    flex: 3,
  },

  titleText: {
    paddingBottom: theme.spacing.sm,
    fontSize: rem(24),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
  },

  descriptionText: {
    paddingBottom: theme.spacing.md,
    fontSize: rem(17),
    color: theme.colors.gray[7],
  },

  image: {
    flex: 1,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,
    paddingRight: `calc(${theme.spacing.xl} * 2)`,
  },
}));

type FeatureComponentProps = {
  title: string;
  description: string;
  image: string;
};

export const Feature = ({ title, description, image }: FeatureComponentProps) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.main}>
      <Container className={classes.textContainer}>
        <Text className={classes.titleText}>{title}</Text>
        <Text className={classes.descriptionText}>{description}</Text>
      </Container>
      <Image src={image} className={classes.image} />
    </Container>
  );
};
