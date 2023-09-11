import React from 'react';
import { Container, Select, TextInput } from '@mantine/core';
import { DegreeGrade, DegreeLevel } from '@datatypes/profile';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';

export const UniversityForm = ({ form, baseKey }: { form: CareerFormProps; baseKey: string }) => {
  const { classes } = questionFormStyles();
  return (
    <Container className={classes.questionContainer}>
      <TextInput
        label="University Name"
        className={classes.questionInput}
        withAsterisk
        {...form.getInputProps(`${baseKey}.university`)}
      />
      <TextInput
        label="Course Name"
        className={classes.questionInput}
        withAsterisk
        {...form.getInputProps(`${baseKey}.name`)}
      />
      <div className={classes.row}>
        <Select
          label="Grade"
          className={classes.questionInput}
          data={Object.values(DegreeGrade).map((value) => ({ value, label: value }))}
          withAsterisk
          {...form.getInputProps(`${baseKey}.grade`)}
        />
        <Select
          label="Level"
          className={classes.questionInput}
          data={Object.values(DegreeLevel).map((value) => ({ value, label: value }))}
          withAsterisk
          {...form.getInputProps(`${baseKey}.level`)}
        />
      </div>
    </Container>
  );
};
