import React, { useState } from 'react';

import { Container, Group, Button, Stepper } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { UseFormReturnType } from '@mantine/form';

import {
  DegreeGrade,
  DegreeLevel,
  Profile,
  University,
  WorkExperience,
  WorkType,
} from '@shared/types/careerTestTypes';
import { UniversityForm } from './UniversityForm';

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

export const EducationForm = ({ form }: { form: UseFormReturnType<Profile> }) => {
  const [additionalDegreesCount, setAdditionalDegreesCount] = useState(0);

  const onClickAddUniversity = () => {
    form.setFieldValue('additional_degrees', [
      ...form.values.additional_degrees,
      initialUniversityValues,
    ]);
    setAdditionalDegreesCount(additionalDegreesCount + 1);
  };

  return (
    <>
      <UniversityForm form={form} baseKey="latest_degree" />
      {[...Array(additionalDegreesCount).keys()].map((key) => {
        return <UniversityForm form={form} baseKey={`additional_degrees.${key}`} />;
      })}
      <Group position="left">
        <Button leftIcon={<IconPlus />} onClick={onClickAddUniversity}>
          Add Another University
        </Button>
      </Group>
    </>
  );
};
