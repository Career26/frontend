import React, { useState } from 'react';
import { Container, Group, Button, Stepper } from '@mantine/core';
import { PageHeader } from '@shared/components/pageHeader/PageHeader';
import { Shell } from '@shared/components/shell/Shell';
import { useGenerateProfileMutation } from '@apis/profile';

import { CareerTestHeader } from './components/CareerTestHeader';
import { EducationForm } from './components/educationForm/EducationForm';
import { WorkExperienceForm } from './components/workExperienceForm/WorkExperienceForm';
import { PreferencesForm } from './components/preferencesForm/PreferencesForm';
import { useProfileForm } from './useProfileForm';
import { CareerPathsForm } from './components/careerPathsForm/CareerPathsForm';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Career Paths'];

export const CareerTest = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [generateProfile, { isLoading: generateProfileIsLoading }] = useGenerateProfileMutation();

  const { form, checkFormIsValid } = useProfileForm({ activeStep });

  const clickNext = async () => {
    console.log(form.values);
    const formIsvalid = checkFormIsValid();
    if (!formIsvalid) {
      return;
    }
    form.clearErrors();
    if (activeStep === 2) {
      await generateProfile(form.values);
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
        <Container>
          <Stepper active={activeStep} onStepClick={setActiveStep} breakpoint="sm">
            {stepperLabels.map((label) => (
              <Stepper.Step label={label} key={`stepper-${label}`} />
            ))}
          </Stepper>
        </Container>
        <Container>
          {activeStep === 0 && <EducationForm form={form} />}
          {activeStep === 1 && <WorkExperienceForm form={form} />}
          {activeStep === 2 && <PreferencesForm form={form} />}
          {activeStep === 3 && <CareerPathsForm form={form} />}
          <Group position="center">
            <Button onClick={clickBack} disabled={activeStep === 0 || generateProfileIsLoading}>
              Back
            </Button>
            <Button
              onClick={clickNext}
              disabled={activeStep === 3 || generateProfileIsLoading}
              loading={generateProfileIsLoading}
            >
              Next
            </Button>
          </Group>
        </Container>
      </>
    </Shell>
  );
};
