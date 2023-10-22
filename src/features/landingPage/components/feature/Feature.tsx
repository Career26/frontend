import React from 'react';
import { Container, Text, Image } from '@mantine/core';

import styles from './featureStyles.module.scss';

interface FeatureComponentProps {
  title: string;
  description: string;
  image?: string;
}

export const Feature = ({ title, description, image }: FeatureComponentProps) => (
  <Container className={styles.main}>
    {image && <Image h={200} src={image} fit="contain" />}
    <Container>
      <Text fw="bold" size="1.5rem" py="md">
        {title}
      </Text>
      <Text className={styles.descriptionText}>{description}</Text>
    </Container>
  </Container>
);
