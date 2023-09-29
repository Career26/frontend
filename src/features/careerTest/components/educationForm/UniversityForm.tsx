import React from 'react';
import { Container, Select, TextInput } from '@mantine/core';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { degreeLevels, degreeOptions } from '@careerTest/config/formConstants';

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
          data={degreeOptions}
          withAsterisk
          {...form.getInputProps(`${baseKey}.grade`)}
        />
        <Select
          label="Level"
          className={classes.questionInput}
          data={degreeLevels}
          withAsterisk
          {...form.getInputProps(`${baseKey}.level`)}
        />
      </div>
    </Container>
  );
};
