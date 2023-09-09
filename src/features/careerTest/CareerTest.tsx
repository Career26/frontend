import React, { useEffect, useMemo, useState } from 'react';
import { Container, Group, Button, Stepper } from '@mantine/core';
import { Shell } from '@shared/components/shell/Shell';
import { useGenerateProfileMutation } from '@apis/profile';
import { setProfile } from '@slices/userSlice';
import { useAppDispatch } from '@state/store';

import { EducationForm } from './components/educationForm/EducationForm';
import { WorkExperienceForm } from './components/workExperienceForm/WorkExperienceForm';
import { PreferencesForm } from './components/preferencesForm/PreferencesForm';
import { useProfileForm } from './hooks/useProfileForm';
import { CareerPathsForm } from './components/careerPathsForm/CareerPathsForm';
import { questionFormStyles } from './styles/careeerTestStyles';
import { CareerTestHeader } from './components/CareerTestHeader';
import { SplashPage } from './components/SlashPage';
import { CareerStep } from './careerTestTypes';
import { CareerTestResults } from './components/CareerTestResults';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Career Paths'];

export const CareerTest = () => {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(CareerStep.EDUCATION);
  const [generateProfile, { data, isLoading }] = useGenerateProfileMutation();
  const { classes } = questionFormStyles();
  const { form, checkFormIsValid } = useProfileForm({ activeStep });

  useEffect(() => {
    if (data) {
      dispatch(setProfile(data));
    }
  }, [data]);

  const clickNext = async () => {
    const formIsvalid = checkFormIsValid();
    if (!formIsvalid) {
      return;
    }
    form.clearErrors();
    if (activeStep === CareerStep.PREFERENCES) {
      generateProfile(form.values);
    }
    setActiveStep(activeStep + 1);
  };

  const clickBack = () => {
    setActiveStep(activeStep - 1);
  };

  const nextLabel = useMemo(() => {
    if (activeStep === CareerStep.PREFERENCES) {
      return 'See Results';
    }
    if (activeStep === CareerStep.CAREER_PATHS) {
      return 'Save Results';
    }
    return 'Next';
  }, [activeStep]);

  return (
    <Shell>
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
          {isLoading ? (
            <SplashPage />
          ) : (
            <>
              {activeStep === CareerStep.EDUCATION && <EducationForm form={form} />}
              {activeStep === CareerStep.WORK_EXPERIENCE && <WorkExperienceForm form={form} />}
              {activeStep === CareerStep.PREFERENCES && <PreferencesForm form={form} />}
              {activeStep === CareerStep.CAREER_PATHS && <CareerPathsForm />}
              {activeStep !== CareerStep.COMPLETE && (
                <Group position="center">
                  {activeStep !== CareerStep.CAREER_PATHS && (
                    <Button
                      onClick={clickBack}
                      disabled={activeStep === CareerStep.EDUCATION || isLoading}
                    >
                      Back
                    </Button>
                  )}
                  <Button onClick={clickNext} disabled={isLoading} loading={isLoading}>
                    {nextLabel}
                  </Button>
                </Group>
              )}
            </>
          )}
        </Container>
        {activeStep === CareerStep.COMPLETE && <CareerTestResults />}
      </>
    </Shell>
  );
};
