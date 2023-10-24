import React from 'react';
import { TagsInput } from '@mantine/core';
import { exampleAreasOfInterest } from '@careerTest/config/formConstants';
import { CareerFormProps } from '@careerTest/careerTestTypes';

export const AreasOfInterestForm = ({ form }: { form: CareerFormProps }) => (
  <div>
    <TagsInput
      py="xs"
      {...form.getInputProps('areasOfInterest')}
      data={exampleAreasOfInterest}
      clearable
      withAsterisk
      placeholder="Add interest"
      label="What are your areas of interest? Choose up to 3"
    />
  </div>
);
