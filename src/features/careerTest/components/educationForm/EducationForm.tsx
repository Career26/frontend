import React from 'react';
import { Group, Button, Text, Divider } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { UseFormReturnType } from '@mantine/form';
import { Profile } from '@datatypes/profile';
import { initialUniversityValues } from '@careerTest/config/formConstants';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';

import { UniversityForm } from './UniversityForm';

export const EducationForm = ({ form }: { form: UseFormReturnType<Profile> }) => {
  const { classes } = questionFormStyles();

  const additionalDegreesCount = form.values.additionalDegrees.length;

  const onClickAddUniversity = () => {
    form.setFieldValue('additionalDegrees', [
      ...form.values.additionalDegrees,
      initialUniversityValues,
    ]);
  };

  return (
    <>
      <Text className={classes.questionTitle}>Education</Text>
      <UniversityForm form={form} baseKey="latestDegree" />
      {[...Array(additionalDegreesCount).keys()].map((key) => {
        const baseKey = `additionalDegrees.${key}`;
        return (
          <>
            <Divider size="lg" className={classes.divider} />
            <UniversityForm form={form} baseKey={baseKey} key={baseKey} />
          </>
        );
      })}
      <Group position="left">
        <Button leftIcon={<IconPlus />} onClick={onClickAddUniversity}>
          Add Another University
        </Button>
      </Group>
    </>
  );
};
