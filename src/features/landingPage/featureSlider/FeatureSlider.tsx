import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Container, Image, Title } from '@mantine/core';
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
    image: careerTestImage,
  },
  {
    title: 'Find Your',
    subTitle: 'Perfect Career',
    image: careerResultsImage,
  },
  {
    title: 'Gain Industry',
    subTitle: 'Insights',
    image: industryInsightsImage,
  },
  {
    title: 'Interview With',
    subTitle: 'Confidence',
    image: interviewImage,
  },
  {
    title: 'Connect With',
    subTitle: 'Industry Mentors',
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
        {slides.map(({ title, subTitle, image }) => (
          <Carousel.Slide key={`slide-${title}`} className={styles.slide}>
            <div className={styles.title}>
              <Title>{title} </Title>
              <Title c="navy">{subTitle}</Title>
            </div>
            <Image src={image} radius="md" />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};
