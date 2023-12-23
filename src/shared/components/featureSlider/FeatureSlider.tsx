import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Container, Image, Title } from '@mantine/core';

import { useMobileStyles } from '@shared/hooks/useMobileStyles';

import styles from './featureSlider.module.css';

interface FeatureSlide {
  title: string;
  subTitle: string;
  image: string;
}

interface FeatureSliderProps {
  slides: FeatureSlide[];
}

export const FeatureSlider = ({ slides }: FeatureSliderProps) => {
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
