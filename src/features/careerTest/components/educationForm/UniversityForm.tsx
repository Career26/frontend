import React from 'react';
import { Container, Select, TextInput } from '@mantine/core';
import formStyles from '@shared/styles/formStyles.module.scss';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { degreeLevels, degreeOptions } from '@careerTest/config/formConstants';

export const UniversityForm = ({ form, baseKey }: { form: CareerFormProps; baseKey: string }) => (
  <Container className={formStyles.questionContainer}>
    <TextInput
      {...form.getInputProps(`${baseKey}.university`)}
      label="University Name"
      className={formStyles.questionInput}
      withAsterisk
    />
    <TextInput
      {...form.getInputProps(`${baseKey}.name`)}
      label="Course Name"
      className={formStyles.questionInput}
      withAsterisk
    />
    <div className={formStyles.row}>
      <Select
        {...form.getInputProps(`${baseKey}.grade`)}
        label="Grade"
        className={formStyles.questionInput}
        data={degreeOptions}
        withAsterisk
        placeholder="Select a grade"
      />
      <Select
        {...form.getInputProps(`${baseKey}.level`)}
        label="Level"
        className={formStyles.questionInput}
        data={degreeLevels}
        withAsterisk
        placeholder="Select a level"
      />
    </div>
  </Container>
);
