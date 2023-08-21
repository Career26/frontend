import React from 'react';
import { Container, Text, Image } from '@mantine/core';

import { featureStyles } from './featureStyles';

interface FeatureComponentProps {
  title: string;
  description: string;
  image: string;
}

export const Feature = ({ title, description, image }: FeatureComponentProps) => {
  const { classes } = featureStyles();

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
