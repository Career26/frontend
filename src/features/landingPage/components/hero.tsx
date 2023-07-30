import React from 'react';
import { createStyles, Container, Text, Button, Group, rem, Image, Title } from '@mantine/core';

const useStyles = createStyles((theme, grayBackground: Boolean) => ({
  main: {
    padding: 0,
    maxWidth: 'none',
    paddingTop: rem(110),
    paddingBottom: rem(110),
    background: grayBackground ? theme.colors.gray[0] : theme.white,
    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column-reverse',
    },
  },

  titleContainer: {
    flex: 1,
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
      marginTop: theme.spacing.xl,
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
  },

  controlContainer: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xl,
    },
  },

  button: {
    [theme.fn.smallerThan('sm')]: {
      flex: 1,
    },
  },
}));

type HeroComponentProps = {
  actionButtonText: string;
  image: string;
  subheadingText: string;
  headingText: string;
  colorHeadingText: string;
  grayBackground: boolean;
  onClick: () => void;
};

export const Hero = ({
  actionButtonText,
  image,
  subheadingText,
  headingText,
  colorHeadingText,
  grayBackground,
  onClick,
}: HeroComponentProps) => {
  const { classes } = useStyles(grayBackground);

  return (
    <Container className={classes.main}>
      <Container className={classes.innerContainer}>
        <Container className={classes.titleContainer}>
          <Title className={classes.title}>
            {headingText}{' '}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              inherit
            >
              {colorHeadingText}
            </Text>
          </Title>
          <Text className={classes.description} color="dimmed">
            {subheadingText}
          </Text>
          <Group className={classes.controlContainer}>
            <Button
              size="xl"
              className={classes.button}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              onClick={onClick}
            >
              {actionButtonText}
            </Button>
          </Group>
        </Container>
        <Image src={image} className={classes.image} />
      </Container>
    </Container>
  );
};
