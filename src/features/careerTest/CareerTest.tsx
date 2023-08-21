import React, { useState } from 'react';
import { Container, Group, Button, Stepper } from '@mantine/core';
import { PageHeader } from '@shared/components/pageHeader/PageHeader';
import { Shell } from '@shared/components/shell/Shell';
import { useGenerateProfileMutation } from '@apis/profile';
import { Hero } from '@shared/components/hero/Hero';

import successImg from '../landingPage/assets/success.svg';
import { EducationForm } from './components/educationForm/EducationForm';
import { WorkExperienceForm } from './components/workExperienceForm/WorkExperienceForm';
import { PreferencesForm } from './components/preferencesForm/PreferencesForm';
import { useProfileForm } from './hooks/useProfileForm';
import { CareerPathsForm } from './components/careerPathsForm/CareerPathsForm';
import { questionFormStyles } from './styles/careeerTestStyles';
import { CareerTestHeader } from './components/CareerTestHeader';
import { SplashPage } from './components/SlashPage';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Career Paths'];

enum CareerStep {
  EDUCATION = 0,
  WORK_EXPERIENCE = 1,
  PREFERENCES = 2,
  CAREER_PATHS = 3,
  COMPLETE = 4,
}

export const CareerTest = () => {
  const [activeStep, setActiveStep] = useState(CareerStep.EDUCATION);
  const [generateProfile, { isLoading: generateProfileIsLoading }] = useGenerateProfileMutation();
  const { classes } = questionFormStyles();
  const { form, checkFormIsValid } = useProfileForm({ activeStep });

  const [showSplashPage, setShowSplashPage] = useState(false);

  const clickNext = async () => {
    console.log(form.values);
    const formIsvalid = checkFormIsValid();
    if (!formIsvalid) {
      return;
    }
    form.clearErrors();
    if (activeStep === CareerStep.PREFERENCES) {
      await generateProfile(form.values);
    }
    if (activeStep === CareerStep.CAREER_PATHS) {
      setShowSplashPage(true);
      setTimeout(() => setShowSplashPage(false), 3000);
    }
    setActiveStep(activeStep + 1);
  };

  const clickBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Shell header={<PageHeader />}>
      <>
        <CareerTestHeader />
        <Container className={classes.steppers}>
          <Stepper active={activeStep} onStepClick={setActiveStep} breakpoint="sm">
            {stepperLabels.map((label) => (
              <Stepper.Step label={label} key={`stepper-${label}`} />
            ))}
          </Stepper>
        </Container>
        <Container>
          {activeStep === CareerStep.EDUCATION && <EducationForm form={form} />}
          {activeStep === CareerStep.WORK_EXPERIENCE && <WorkExperienceForm form={form} />}
          {activeStep === CareerStep.PREFERENCES && <PreferencesForm form={form} />}
          {activeStep === CareerStep.CAREER_PATHS && <CareerPathsForm />}
          {activeStep === CareerStep.COMPLETE && showSplashPage && <SplashPage />}
          {activeStep === CareerStep.COMPLETE && !showSplashPage && <CareerPathsForm />}
          {activeStep !== CareerStep.COMPLETE && (
            <Group position="center">
              <Button
                onClick={clickBack}
                disabled={activeStep === CareerStep.EDUCATION || generateProfileIsLoading}
              >
                Back
              </Button>

              <Button
                onClick={clickNext}
                disabled={generateProfileIsLoading}
                loading={generateProfileIsLoading}
              >
                Next
              </Button>
            </Group>
          )}
        </Container>
        {activeStep === CareerStep.COMPLETE && !showSplashPage && (
          <Hero
            image={successImg}
            actionButtonText="Create a Profile!"
            subheadingText="Create a free profile to get your save your results and gain access to personalised career paths, CV enhancement, and interview tests to help you achieve your dream career. It only takes a few seconds."
            headingText="Don't lose your results!"
            colorHeadingText="Sign up today"
            onClick={() => {}}
            grayBackground
          />
        )}
      </>
    </Shell>
  );
};
