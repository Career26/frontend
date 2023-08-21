import { CareerStep } from '@careerTest/careerTestTypes';
import React from 'react';
import { useAppSelector } from '@state/store';
import { selectIsLoggedIn } from '@slices/userSlice';
import { Hero } from '@shared/components/hero/Hero';

import successImg from '../../landingPage/assets/success.svg';
import careerPathsImg from '../../landingPage/assets/careerPaths.svg';

type CareerTestFooterProps = {
  activeStep: CareerStep;
  showSplashPage?: boolean;
};

export const CareerTestFooter = ({ showSplashPage, activeStep }: CareerTestFooterProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  if (showSplashPage || activeStep !== CareerStep.COMPLETE) {
    return null;
  }
  if (isLoggedIn) {
    return (
      <Hero
        image={careerPathsImg}
        actionButtonText="Explore Career Paths"
        subheadingText="Discover more about your personalised career paths and start preparing for interviews with CV enhancement, interview questions, and more."
        headingText="Your Profile is Built!"
        colorHeadingText="Prepare for your Future"
        onClick={() => {}}
        grayBackground
      />
    );
  }
  return (
    <Hero
      image={successImg}
      actionButtonText="Create a Profile!"
      subheadingText="Create a free profile to get your save your results and gain access to personalised career paths, CV enhancement, and interview tests to help you achieve your dream career. It only takes a few seconds."
      headingText="Don't lose your results!"
      colorHeadingText="Sign up today"
      onClick={() => {}}
      grayBackground
    />
  );
};
