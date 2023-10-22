import React from 'react';
import { Select, TextInput } from '@mantine/core';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { degreeLevels, degreeOptions } from '@careerTest/config/formConstants';

export const UniversityForm = ({ form, baseKey }: { form: CareerFormProps; baseKey: string }) => (
  <div>
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
  </div>
);
