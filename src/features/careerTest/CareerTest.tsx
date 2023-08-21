import React, { useState } from 'react';
import { Container, Group, Button, Stepper } from '@mantine/core';
import { PageHeader } from '@shared/components/pageHeader/PageHeader';
import { Shell } from '@shared/components/shell/Shell';
import { useGenerateProfileMutation } from '@apis/profile';

import { EducationForm } from './components/educationForm/EducationForm';
import { WorkExperienceForm } from './components/workExperienceForm/WorkExperienceForm';
import { PreferencesForm } from './components/preferencesForm/PreferencesForm';
import { useProfileForm } from './hooks/useProfileForm';
import { CareerPathsForm } from './components/careerPathsForm/CareerPathsForm';
import { questionFormStyles } from './styles/careeerTestStyles';
import { CareerTestHeader } from './components/CareerTestHeader';
import { SplashPage } from './components/SlashPage';
import { CareerStep } from './careerTestTypes';
import { CareerTestFooter } from './components/CareerTestFooter';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Career Paths'];

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
        {activeStep !== CareerStep.COMPLETE && (
          <Container className={classes.steppers}>
            <Stepper active={activeStep} onStepClick={setActiveStep} breakpoint="sm">
              {stepperLabels.map((label) => (
                <Stepper.Step label={label} key={`stepper-${label}`} />
              ))}
            </Stepper>
          </Container>
        )}
        <Container>
          {activeStep === CareerStep.EDUCATION && <EducationForm form={form} />}
          {activeStep === CareerStep.WORK_EXPERIENCE && <WorkExperienceForm form={form} />}
          {activeStep === CareerStep.PREFERENCES && <PreferencesForm form={form} />}
          {activeStep === CareerStep.CAREER_PATHS && <CareerPathsForm />}
          {showSplashPage && <SplashPage />}
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
        <CareerTestFooter activeStep={activeStep} showSplashPage={showSplashPage} />
      </>
    </Shell>
  );
};
