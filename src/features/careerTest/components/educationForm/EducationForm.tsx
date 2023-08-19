import React, { useState } from 'react';
import { Group, Button, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { UseFormReturnType } from '@mantine/form';
import { Profile } from '@datatypes/profile';
import { initialUniversityValues } from '@careerTest/config/formConstants';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';

import { UniversityForm } from './UniversityForm';

export const EducationForm = ({ form }: { form: UseFormReturnType<Profile> }) => {
  const { classes } = questionFormStyles();

  const [additionalDegreesCount, setAdditionalDegreesCount] = useState(
    form.values.additionalDegrees.length,
  );

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
