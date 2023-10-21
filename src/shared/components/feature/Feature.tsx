import React from 'react';
import { Container, Text, Image, rem, createStyles } from '@mantine/core';

interface FeatureComponentProps {
  title: string;
  description: string;
  image?: string;
}

const featureStyles = createStyles((theme) => ({
  main: {
    display: flex;
    flex-direction: 'row',
    flex: 1,
    align-items: center;
    padding: 0,
    padding-top: var(--mantine-spacing-xl);,
    padding-bottom: var(--mantine-spacing-xl);,

    [theme.fn.smallerThan('md')]: {
      flex-direction: column;
    },
  },

  textContainer: {
    flex: 3,
    padding: 0,
  },

  titleText: {
    padding-bottom: theme.spacing.sm,
    fontSize: rem(24),
    fontWeight: 800,
    lineHeight: 1.1,
    color: var(--mantine-color-gray-9);

    [theme.fn.smallerThan('md')]: {
      text-align: 'center',
    },
  },

  descriptionText: {
    fontSize: rem(17),
    color: theme.colors.gray[7],

    [theme.fn.smallerThan('md')]: {
      text-align: 'center',
    },
  },

  image: {
    flex: 1,
    paddingLeft: `calc(${var(--mantine-spacing-xl);} * 2)`,
    paddingRight: `calc(${var(--mantine-spacing-xl);} * 2)`,

    [theme.fn.smallerThan('md')]: {
      maxWidth: rem(300),
      padding-bottom: var(--mantine-spacing-xl);,
    },
  },
}));

export const Feature = ({ title, description, image }: FeatureComponentProps) => {
  const { classes } = featureStyles();

  return (
    <Container className={classes.main}>
      {image && <Image src={image} className={classes.image} />}
      <Container className={classes.textContainer}>
        <Text className={classes.titleText}>{title}</Text>
        <Text className={classes.descriptionText}>{description}</Text>
      </Container>
    </Container>
  );
};
