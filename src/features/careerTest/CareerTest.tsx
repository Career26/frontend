import React, { useMemo, useState } from 'react';

import { Container, Group, Button, Stepper } from '@mantine/core';
import { FORM_INDEX, hasLength, useForm } from '@mantine/form';

import { PageHeader } from '@shared/components/pageHeader/PageHeader';

import { Shell } from '@shared/components/shell/Shell';

import { CareerTestHeader } from './components/CareerTestHeader';
import { ProfileInput } from '@shared/types/careerTestTypes';
import { EducationForm } from './components/educationForm/EducationForm';
import { initialProfileValues } from './config/formConstants';
import { WorkExperienceForm } from './components/workExperienceForm/WorkExperienceForm';

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
    return undefined;
  }, [activeStep]);

  const form = useForm<ProfileInput>({
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
    },
  });

  const checkFormIsValid = () => fieldsToCheck?.every((field) => form.isValid(field));

  const clickNext = () => {
    if (checkFormIsValid()) {
      form.clearErrors();
      setActiveStep(activeStep + 1);
    }
  };

  console.log(form.values, checkFormIsValid(), activeStep, fieldsToCheck);

  return (
    <Shell header={<PageHeader />}>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
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
          <Group position="center">
            <Button type="submit" onClick={clickNext}>
              Next Question
            </Button>
          </Group>
        </Container>
      </form>
    </Shell>
  );
};
