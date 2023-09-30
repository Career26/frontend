import React from 'react';
import { Container, Select, TextInput } from '@mantine/core';
import { formStyles } from '@shared/styles/formStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { degreeLevels, degreeOptions } from '@careerTest/config/formConstants';

export const UniversityForm = ({ form, baseKey }: { form: CareerFormProps; baseKey: string }) => {
  const { classes } = formStyles();
  return (
    <Container className={classes.questionContainer}>
      <TextInput
        {...form.getInputProps(`${baseKey}.university`)}
        label="University Name"
        className={classes.questionInput}
        withAsterisk
      />
      <TextInput
        {...form.getInputProps(`${baseKey}.name`)}
        label="Course Name"
        className={classes.questionInput}
        withAsterisk
      />
      <div className={classes.row}>
        <Select
          {...form.getInputProps(`${baseKey}.grade`)}
          label="Grade"
          className={classes.questionInput}
          data={degreeOptions}
          withAsterisk
        />
        <Select
          {...form.getInputProps(`${baseKey}.level`)}
          label="Level"
          className={classes.questionInput}
          data={degreeLevels}
          withAsterisk
        />
      </div>
    </Container>
  );
};
