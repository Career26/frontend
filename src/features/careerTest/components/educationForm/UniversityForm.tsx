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
        {...form.getInputProps(`${baseKey}.university`)}
        label="University Name"
        className={classes.questionInput}
      />
      <TextInput
        {...form.getInputProps(`${baseKey}.name`)}
        label="Course Name"
        className={classes.questionInput}
      />
      <div className={classes.row}>
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
      </div>
    </Container>
  );
};
