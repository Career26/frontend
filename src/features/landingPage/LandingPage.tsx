import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Text } from '@mantine/core';
import { urls } from '@shared/config/urlConstants';
import { Shell } from '@shared/components/shell/Shell';
import careerProgressImg from '@assets/careerProgress.png';
import successImg from '@assets/success.png';

import { Feature } from './components/feature/Feature';
import { featureList, featuresTag } from './config/landingPageConstants';
import styles from './landingPageStyles.module.scss';
import { Hero } from './components/hero/Hero';

export const LandingPage = () => {
  const history = useHistory();
  const takeTest = () => history.push(urls.careersTest);

  return (
    <Shell>
      <>
        <Hero
          image={careerProgressImg}
          actionButtonText="Start Your Journey Now!"
          subheadingText="Reveal your perfect career path, ace interviews, elevate your CV and connect with a network of professionals with our all-in-one
          career advisory platform"
          headingText="Discover Your"
          colorHeadingText="Perfect Career"
          onClick={() => history.push(urls.careersTest)}
          grayBackground={false}
        />

        <Container className={styles.featuresContainer} id={featuresTag}>
          <Text fw="bold" className={styles.pricingText}>
            Your All-In-One Career Platform
          </Text>
          {featureList.map((item) => (
            <Feature
              title={item.title}
              key={item.title}
              image={item.image}
              description={item.description}
            />
          ))}
        </Container>

        <Hero
          image={successImg}
          actionButtonText="Try For Free!"
          subheadingText="Ready to unleash your potential? Take our free questionnaire to view your career paths now"
          headingText="Join & Achieve"
          colorHeadingText="Career Success"
          onClick={takeTest}
          grayBackground
        />
      </>
    </Shell>
  );
};
