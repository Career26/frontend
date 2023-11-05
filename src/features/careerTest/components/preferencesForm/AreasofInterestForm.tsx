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
      placeholder="Enter interest"
      label="Press Enter to add an interest"
      description="Add up to 3 interests"
    />
  </div>
);
