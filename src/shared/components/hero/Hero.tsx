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
  <Container className={classNames(styles.main, { [styles.grayBackground]: grayBackground })}>
    <Container className={styles.innerContainer}>
      <Container className={styles.titleContainer}>
        <Title className={styles.title}>
          {headingText}{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            {colorHeadingText}
          </Text>
        </Title>
        <Text className={styles.description} color="dimmed">
          {subheadingText}
        </Text>
        <Center className={styles.imageMobileContainer}>
          <Image src={image} className={styles.imageMobile} />
        </Center>
        <Group className={styles.controlContainer}>
          <Button
            size="xl"
            className={styles.button}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            onClick={onClick}
          >
            {actionButtonText}
          </Button>
        </Group>
      </Container>
      <Image src={image} className={styles.image} />
    </Container>
  </Container>
);
