import React, { useState } from 'react';

import { Container, Group, Button, Stepper } from '@mantine/core';
import { FORM_INDEX, useForm } from '@mantine/form';

import { PageHeader } from '@shared/components/pageHeader/PageHeader';

import { Shell } from '@shared/components/shell/Shell';

import { CareerTestHeader } from './components/CareerTestHeader';
import {
  DegreeGrade,
  DegreeLevel,
  Profile,
  University,
  WorkExperience,
  WorkType,
} from '@shared/types/careerTestTypes';
import { EducationForm } from './components/educationForm/EducationForm';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Career Paths'];

const initialUniversityValues: University = {
  grade: DegreeGrade.FIRST,
  level: DegreeLevel.BA,
  name: '',
  university: '',
};

const initialWorkExperienceValues: WorkExperience = {
  company_name: '',
  rating: 5,
  rating_reason: '',
  role: '',
};

const initialProfileValues: Profile = {
  additional_degrees: [],
  areas_of_interest: [],
  expected_salary: { base_currency: 'GBP', city: 'London', expected_salary: 40000 },
  personality_type: { work_life_balance_sacrifice: false, work_style: WorkType.GROUP },
  latest_degree: initialUniversityValues,
  previous_work_experience: [initialWorkExperienceValues],
  full_name: 'Test Student',
};

export const CareerTest = () => {
  const [activeStep, setActiveStep] = useState(0);

  const validateInputOnChange = () => {
    if (activeStep === 0) {
      return ['latest_degree', `additional_degrees.${FORM_INDEX}`];
    }
    return false;
  };

  const form = useForm<Profile>({
    initialValues: initialProfileValues,
    validateInputOnChange: validateInputOnChange(),
    validate: {
      latest_degree: {
        name: (value) => !value && 'Course name is required',
        university: (value) => !value && 'University is required',
      },
      additional_degrees: {
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
