import React from 'react';
import { MultiSelect } from '@mantine/core';
import { exampleAreasOfInterest } from '@careerTest/config/formConstants';
import { CareerFormProps } from '@careerTest/careerTestTypes';

export const AreasOfInterestForm = ({ form }: { form: CareerFormProps }) => (
  <div>
    <MultiSelect
      py="xs"
      {...form.getInputProps('areasOfInterest')}
      data={exampleAreasOfInterest}
      searchable
      clearable
      withAsterisk
      placeholder="Search for interest"
      label="What are your areas of interest? Choose up to 3"
    />
  </div>
);
