import React, { useMemo, useState } from 'react';
import { Container, Group, Button, Stepper } from '@mantine/core';
import { FORM_INDEX, useForm } from '@mantine/form';
import { PageHeader } from '@shared/components/pageHeader/PageHeader';
import { Shell } from '@shared/components/shell/Shell';
import { Profile } from '@datatypes/profile';

import { CareerTestHeader } from './components/CareerTestHeader';
import { EducationForm } from './components/educationForm/EducationForm';
import { initialProfileValues } from './config/formConstants';
import { WorkExperienceForm } from './components/workExperienceForm/WorkExperienceForm';
import { PreferencesForm } from './components/preferencesForm/PreferencesForm';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Career Paths'];

export const CareerTest = () => {
  const [activeStep, setActiveStep] = useState(0);

  const fieldsToCheck = useMemo(() => {
    if (activeStep === 0) {
      return ['latestDegree', `additionalDegrees.${FORM_INDEX}`];
    }
    if (activeStep === 1) {
      return [`previousWorkExperience.${FORM_INDEX}`];
    }
    if (activeStep === 2) {
      return ['areasOfInterest', 'expectedSalary'];
    }
    return undefined;
  }, [activeStep]);

  const form = useForm<Profile>({
    initialValues: initialProfileValues,
    validateInputOnChange: true,
    validate: {
      latestDegree: {
        name: (value) => !value && 'Course name is required',
        university: (value) => !value && 'University is required',
      },
      additionalDegrees: {
        name: (value) => !value && 'Course name is required',
        university: (value) => !value && 'University is required',
      },
      previousWorkExperience: {
        role: (value) => !value && 'Role is required',
        companyName: (value) => !value && 'Company name is required',
        ratingReason: (value) => {
          if (!value) {
            return 'You must provide a reason for the rating';
          }
          if (value.length > 300) {
            return 'Maximum character length is 300';
          }
          return null;
        },
      },
      areasOfInterest: (value) => {
        if (!value.length) {
          return 'You must select at least one area of interest';
        }
        if (value.length > 3) {
          return 'You can only choose up to three areas of interest';
        }
        return null;
      },
      expectedSalary: {
        expectedSalary: (value) => !value && 'Expected salary is required',
      },
    },
  });

  const checkFormIsValid = () => fieldsToCheck?.every((field) => form.isValid(field));

  const clickNext = () => {
    if (checkFormIsValid()) {
      form.clearErrors();
      setActiveStep(activeStep + 1);
    }
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
          <Group position="center">
            <Button onClick={clickNext}>Next Question</Button>
            <Button onClick={clickBack} disabled={activeStep === 0}>
              Back
            </Button>
          </Group>
        </Container>
      </>
    </Shell>
  );
};
