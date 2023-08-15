import React, { useState } from 'react';

import { Group, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { UseFormReturnType } from '@mantine/form';

import { ProfileInput } from '@shared/types/careerTestTypes';
import { UniversityForm } from './UniversityForm';
import { initialUniversityValues } from '../../config/formConstants';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Career Paths'];

export const EducationForm = ({ form }: { form: UseFormReturnType<ProfileInput> }) => {
  const [additionalDegreesCount, setAdditionalDegreesCount] = useState(0);

  const onClickAddUniversity = () => {
    form.setFieldValue('additionalDegrees', [
      ...form.values.additionalDegrees,
      initialUniversityValues,
    ]);
    setAdditionalDegreesCount(additionalDegreesCount + 1);
  };

  return (
    <>
      <UniversityForm form={form} baseKey="latestDegree" />
      {[...Array(additionalDegreesCount).keys()].map((key) => {
        return <UniversityForm form={form} baseKey={`additionalDegrees.${key}`} />;
      })}
      <Group position="left">
        <Button leftIcon={<IconPlus />} onClick={onClickAddUniversity}>
          Add Another University
        </Button>
      </Group>
    </>
  );
};
