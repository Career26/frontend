import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Container, Image, Text, Title } from '@mantine/core';
import careerResultsImage from '@assets/careerResults.png';
import interviewImage from '@assets/interviewQuestion.png';
import careerTestImage from '@assets/careerTest.png';
import industryInsightsImage from '@assets/industryInsights.png';
import networkImg from '@assets/network.png';

import styles from './featureSlider.module.scss';

const slides = [
  {
    title: 'Take Our Free',
    subTitle: 'Career Test',
    description: "Our career test is easy to use, quick to complete, and best of all it's free!",
    image: careerTestImage,
  },
  {
    title: 'Find Your',
    subTitle: 'Perfect Career',
    description: 'Receive tailored career suggestions and discover your perfect career path.',
    image: careerResultsImage,
  },
  {
    title: 'Gain Industry',
    subTitle: 'Insights',
    description: 'Explore indsutry insights and what its really like to work in your dream career',
    image: industryInsightsImage,
  },
  {
    title: 'Interview With',
    subTitle: 'Confidence',
    description:
      'Our interactive interview questions prepare you for even the most challenging interviews.',
    image: interviewImage,
  },
  {
    title: 'Connect With',
    subTitle: 'Industry Mentors',
    description:
      'Join our network and receive mentoring from industry professions who know the secrets to success.',
    image: networkImg,
  },
];

export const FeatureSlider = () => {
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  return (
    <Container className={styles.container}>
      <Carousel
        classNames={styles}
        withIndicators
        height={500}
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {slides.map(({ title, subTitle, description, image }) => (
          <Carousel.Slide key={`slide-${title}`} className={styles.slide}>
            <Container px="md" className={styles.titleContainer}>
              <Title className={styles.title}>
                {title}{' '}
                <Text component="span" c="navy" inherit>
                  {subTitle}
                </Text>
              </Title>
              <Text c="dimmed" py="md" className={styles.description}>
                {description}
              </Text>
            </Container>
            <Container>
              <Image src={image} radius="md" />
            </Container>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};
