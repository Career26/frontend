import React from 'react';
import { Select, TextInput } from '@mantine/core';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { degreeLevels, degreeOptions } from '@careerTest/config/formConstants';

import { FormContent } from '../FormContent';

export const UniversityForm = ({
  form,
  baseKey,
  title,
}: {
  title?: string;
  form: CareerFormProps;
  baseKey: string;
}) => (
  <FormContent title={title}>
    <TextInput
      {...form.getInputProps(`${baseKey}.university`)}
      label="University Name"
      withAsterisk
      py="xs"
    />
    <TextInput
      {...form.getInputProps(`${baseKey}.name`)}
      label="Course Name"
      withAsterisk
      py="xs"
    />
    <div>
      <Select
        {...form.getInputProps(`${baseKey}.grade`)}
        label="Grade"
        data={degreeOptions}
        withAsterisk
        placeholder="Select a grade"
        py="xs"
      />
      <Select
        {...form.getInputProps(`${baseKey}.level`)}
        label="Level"
        data={degreeLevels}
        withAsterisk
        placeholder="Select a level"
        py="xs"
      />
    </div>
  </FormContent>
);
