import React from 'react';
import { Container, Select, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { DegreeGrade, DegreeLevel, ProfileInput } from '@shared/types/careerTestTypes';

import { questionFormStyles } from '../../styles/careeerTestStyles';

export const UniversityForm = ({
  form,
  baseKey,
}: {
  form: UseFormReturnType<ProfileInput>;
  baseKey: string;
}) => {
  const { classes } = questionFormStyles();
  return (
    <Container className={classes.questionContainer}>
      <Text className={classes.questionTitle}>Education</Text>
      <TextInput
        {...form.getInputProps(`${baseKey}.university`)}
        label="University Name"
        className={classes.questionInput}
      />
      <TextInput
        {...form.getInputProps(`${baseKey}.name`)}
        label="Course Name"
        className={classes.questionInput}
      />
      <Select
        {...form.getInputProps(`${baseKey}.grade`)}
        label="Grade"
        className={classes.questionInput}
        data={Object.values(DegreeGrade).map((value) => ({ value, label: value }))}
      />
      <Select
        {...form.getInputProps(`${baseKey}.level`)}
        label="Level"
        className={classes.questionInput}
        data={Object.values(DegreeLevel).map((value) => ({ value, label: value }))}
      />
    </Container>
  );
};
