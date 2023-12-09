import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Text } from '@mantine/core';
import { urls } from '@shared/config/urlConstants';
import { Shell } from '@shared/components/shell/Shell';

import styles from './landingPageStyles.module.scss';
import { FeatureSlider } from './featureSlider/FeatureSlider';

export const LandingPage = () => {
  const history = useHistory();
  const takeTest = () => history.push(urls.careersTest);

  return (
    <Shell>
      <>
        <FeatureSlider />
        <Container className={styles.footer} py="lg">
          <Text fw="bold" className={styles.title}>
            Your All-In-One Career Platform
          </Text>
          <Container py="xs">
            <Button onClick={takeTest} color="navy">
              Start Now
            </Button>
          </Container>
        </Container>
      </>
    </Shell>
  );
};
