import React, { useState } from 'react';

import { Group, Button, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { UseFormReturnType } from '@mantine/form';

import { ProfileInput } from '@shared/types/careerTestTypes';
import { UniversityForm } from './UniversityForm';
import { initialUniversityValues } from '../../config/formConstants';
import { questionFormStyles } from '../../styles/careeerTestStyles';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Career Paths'];

export const EducationForm = ({ form }: { form: UseFormReturnType<ProfileInput> }) => {
  const { classes } = questionFormStyles();

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
      <Text className={classes.questionTitle}>Education</Text>
      <UniversityForm form={form} baseKey="latestDegree" />
      {[...Array(additionalDegreesCount).keys()].map((key) => {
        const baseKey = `additionalDegrees.${key}`;
        return <UniversityForm form={form} baseKey={baseKey} key={baseKey} />;
      })}
      <Group position="left">
        <Button leftIcon={<IconPlus />} onClick={onClickAddUniversity}>
          Add Another University
        </Button>
      </Group>
    </>
  );
};
