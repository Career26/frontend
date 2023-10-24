import React from 'react';
import { Container, Text, Button, Group, Image, Title, Center } from '@mantine/core';
import classNames from 'classnames';

import styles from './heroStyles.module.scss';

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
}: HeroComponentProps) => (
  <Container
    p="xl"
    className={classNames(styles.main, { [styles.grayBackground]: grayBackground })}
  >
    <Container className={styles.innerContainer}>
      <Container>
        <Title fw="bold" size="3.5rem" className={styles.title}>
          {headingText}{' '}
          <Text component="span" c="navy" inherit>
            {colorHeadingText}
          </Text>
        </Title>
        <Text c="dimmed" py="md" size="lg">
          {subheadingText}
        </Text>
      </Container>
      <Center className={styles.imageMobileContainer}>
        <Image src={image} className={styles.imageMobile} />
      </Center>
    </Container>

    <Container>
      <Group py="md" px="sm">
        <Button size="xl" color="navy" onClick={onClick}>
          {actionButtonText}
        </Button>
      </Group>
    </Container>
  </Container>
);
