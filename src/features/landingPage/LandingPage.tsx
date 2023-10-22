import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Badge, Text, Group } from '@mantine/core';
import { urls } from '@shared/config/urlConstants';
import { Shell } from '@shared/components/shell/Shell';
import { Feature } from '@shared/components/feature/Feature';
import { Hero } from '@shared/components/hero/Hero';
import careerProgressImg from '@assets/careerProgress.svg';
import successImg from '@assets/success.svg';

import { PricingTile } from './components/PricingTile';
import { featureList, featuresTag, pricingTag } from './config/landingPageConstants';
import styles from './landingPageStyles.module.scss';

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
          <Text className={styles.pricingText}>Your All-In-One Career Platform</Text>
          {featureList.map((item) => (
            <Feature
              title={item.title}
              key={item.title}
              image={item.image}
              description={item.description}
            />
          ))}
        </Container>

        <Container className={styles.pricingContainer} id={pricingTag}>
          <Badge size="xl" radius="sm" variant="light">
            Pricing
          </Badge>

          <Text className={styles.pricingText}>Invest in Your Future. Start For Free!</Text>

          <Container className={styles.pricingTierContainer}>
            <Group display="flex">
              <PricingTile
                title="Free Tier"
                amount="£0"
                peroid="Month"
                buttonText="Try For Free"
                benefits={[
                  'Personalised Career Paths',
                  'Limited Interview Questions',
                  'Basic CV Enhancement',
                ]}
                onClick={takeTest}
              />

              <PricingTile
                title="Premium Tier"
                amount="£19"
                peroid="Month"
                buttonText="Get Started"
                benefits={[
                  'Personalised Career Paths',
                  'Extensive Interview Questions',
                  'Advanced CV Enhancement',
                ]}
                onClick={takeTest}
              />
            </Group>
          </Container>
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
