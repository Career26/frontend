import React from 'react';
import { Hero } from '@shared/components/hero/Hero';
import { useHistory } from 'react-router-dom';
import { urls } from '@shared/config/urlConstants';
import careerPathsImg from '@assets/careerPaths.svg';

export const CareerTestResults = () => {
  const history = useHistory();

  const goToHomepage = () => {
    history.push(urls.landingPage);
  };

  return (
    <Hero
      image={careerPathsImg}
      actionButtonText="Start Exploring Today"
      subheadingText="Discover more about your personalised career paths and start preparing for interviews with CV enhancement, interview questions, and more."
      headingText="Your Profile is Built!"
      colorHeadingText="Explore your Future"
      onClick={goToHomepage}
      grayBackground
    />
  );
};
