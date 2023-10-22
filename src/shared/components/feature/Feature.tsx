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
    {image && <Image src={image} className={styles.image} w="50%" />}
    <Container className={styles.textContainer}>
      <Text className={styles.titleText}>{title}</Text>
      <Text className={styles.descriptionText}>{description}</Text>
    </Container>
  </Container>
);
