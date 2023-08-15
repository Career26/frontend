import React, { useState } from 'react';

import { Container, Group, Button, Stepper } from '@mantine/core';
import { FORM_INDEX, useForm } from '@mantine/form';

import { PageHeader } from '@shared/components/pageHeader/PageHeader';

import { Shell } from '@shared/components/shell/Shell';

import { CareerTestHeader } from './components/CareerTestHeader';
import { ProfileInput } from '@shared/types/careerTestTypes';
import { EducationForm } from './components/educationForm/EducationForm';
import { initialProfileValues } from './config/formConstants';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Career Paths'];

export const CareerTest = () => {
  const [activeStep, setActiveStep] = useState(0);

  const validateInputOnChange = () => {
    if (activeStep === 0) {
      return ['latest_degree', `additional_degrees.${FORM_INDEX}`];
    }
    return false;
  };

  const form = useForm<ProfileInput>({
    initialValues: initialProfileValues,
    validateInputOnChange: validateInputOnChange(),
    validate: {
      latestDegree: {
        name: (value) => !value && 'Course name is required',
        university: (value) => !value && 'University is required',
      },
      additionalDegrees: {
        name: (value) => !value && 'Course name is required',
        university: (value) => !value && 'University is required',
      },
    },
  });

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
          <EducationForm form={form} />
          <Group position="center">
            <Button
              disabled={!form.isValid()}
              type="submit"
              onClick={() => {
                if (form.isValid()) {
                  setActiveStep(activeStep + 1);
                }
              }}
            >
              Next Question
            </Button>
          </Group>
        </Container>
      </form>
    </Shell>
  );
};
