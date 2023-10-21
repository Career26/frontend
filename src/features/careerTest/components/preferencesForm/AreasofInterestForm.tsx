import React from 'react';
import { Container, MultiSelect } from '@mantine/core';
import { exampleAreasOfInterest } from '@careerTest/config/formConstants';
import { formStyles } from '@shared/styles/formStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';

export const AreasOfInterestForm = ({ form }: { form: CareerFormProps }) => {
  const { classes } = formStyles();
  return (
    <Container className={classes.questionContainer}>
      <div className={classes.questionInput}>
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
};
