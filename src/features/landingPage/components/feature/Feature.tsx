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
    <Image className={styles.image} w={200} src={image} />
    <Container className={styles.textContainer}>
      <Text fw="bold" size="1.5rem" pb="md">
        {title}
      </Text>
      <Text className={styles.descriptionText}>{description}</Text>
    </Container>
  </Container>
);
