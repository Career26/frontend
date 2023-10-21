import React from 'react';
import { Container, MultiSelect } from '@mantine/core';
import { exampleAreasOfInterest } from '@careerTest/config/formConstants';
import formStyles from '@shared/styles/formStyles.module.scss';
import { CareerFormProps } from '@careerTest/careerTestTypes';

export const AreasOfInterestForm = ({ form }: { form: CareerFormProps }) => (
  <Container className={formStyles.questionContainer}>
    <div className={formStyles.questionInput}>
      <MultiSelect
        {...form.getInputProps('areasOfInterest')}
        data={exampleAreasOfInterest}
        searchable
        clearable
        withAsterisk
        placeholder="Search for interest"
        label="What are your areas of interest? Choose up to 3"
      />
    </div>
  </Container>
);
