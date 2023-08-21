import React from 'react';
import { Container, Text, Button, Group, Image, Title, Center } from '@mantine/core';

import { heroStyles } from './heroStyles';

interface HeroComponentProps {
  actionButtonText: string;
  image: string;
  subheadingText: string;
  headingText: string;
  colorHeadingText: string;
  grayBackground: boolean;
  onClick: () => void;
}

export const Hero = ({
  actionButtonText,
  image,
  subheadingText,
  headingText,
  colorHeadingText,
  grayBackground,
  onClick,
}: HeroComponentProps) => {
  const { classes } = heroStyles(grayBackground);

  return (
    <Container className={classes.main}>
      <Container className={classes.innerContainer}>
        <Container className={classes.titleContainer}>
          <Title className={classes.title}>
            {headingText}
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
          <Center className={classes.imageMobileContainer}>
            <Image src={image} className={classes.imageMobile} />
          </Center>
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
