import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Container, Image, Title } from '@mantine/core';
import careerResultsImage from '@assets/careerResults.png';
import interviewImage from '@assets/interviewQuestion.png';
import careerTestImage from '@assets/careerTest.png';
import industryInsightsImage from '@assets/industryInsights.png';
import networkImg from '@assets/network.png';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';

import styles from './featureSlider.module.scss';

const slides = [
  {
    title: 'Take A Quick',
    subTitle: 'Career26 Test',
    image: careerTestImage,
  },
  {
    title: 'Get Your',
    subTitle: 'Personalised Career Advice',
    image: careerResultsImage,
  },
  {
    title: 'Explore Industry',
    subTitle: 'Insights and Guidance',
    image: industryInsightsImage,
  },
  {
    title: 'Practice Interviews',
    subTitle: 'With Real-time Feedback',
    image: interviewImage,
  },
  {
    title: 'Find A Mentor',
    subTitle: 'In Our Global Network',
    image: networkImg,
  },
];

export const FeatureSlider = () => {
  const { isMobile } = useMobileStyles();
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (
    <Container className={styles.container}>
      <Carousel
        classNames={styles}
        withIndicators
        height={isMobile ? 300 : 500}
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
