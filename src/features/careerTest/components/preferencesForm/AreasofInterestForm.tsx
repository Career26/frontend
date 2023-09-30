import React, { useState } from 'react';
import { Container, MultiSelect } from '@mantine/core';
import { exampleAreasOfInterest } from '@careerTest/config/formConstants';
import { questionFormStyles } from '@careerTest/styles/careerTestStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';

export const AreasOfInterestForm = ({ form }: { form: CareerFormProps }) => {
  const { classes } = questionFormStyles();
  const [options, setOptions] = useState([...exampleAreasOfInterest]);
  return (
    <Container className={classes.questionContainer}>
      <div className={classes.questionInput}>
        <MultiSelect
          data={options}
          searchable
          clearable
          withAsterisk
          placeholder="Search for interest"
          creatable
          getCreateLabel={(query) => `+ Add ${query}`}
          onCreate={(query) => {
            setOptions([...options, query]);
            return query;
          }}
          label="What are your areas of interest? Choose up to 3"
          {...form.getInputProps('areasOfInterest')}
        />
      </div>
    </Container>
  );
};
