import React, { useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { Checkbox, Container, Select, Text, TextInput } from '@mantine/core';
import { Profile, WorkStyle } from '@datatypes/profile';
import { exampleCities } from '@careerTest/config/formConstants';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';

export const WorkStyleForm = ({ form }: { form: UseFormReturnType<Profile> }) => {
  const { classes } = questionFormStyles();
  const [symbol, setSymbol] = useState('£');

  const onChange = (value: string) => {
    const city = exampleCities.find((item) => item.value === value);
    if (!city) {
      return;
    }
    form.setFieldValue('expectedSalary.city', city.value);
    form.setFieldValue('expectedSalary.baseCurrency', city.baseCurrency);
    setSymbol(city.symbol);
  };

  return (
    <Container className={classes.questionContainer}>
      <Select
        {...form.getInputProps('personalityType.workStyle')}
        label="What is your preferred working style?"
        className={classes.questionInput}
        data={Object.values(WorkStyle)}
      />
      <Checkbox
        {...form.getInputProps('personalityType.workLifeBalanceSacrifice')}
        label="Would you sacrifice your work-life balance?"
      />
      <Select
        {...form.getInputProps('expectedSalary.city')}
        label="City"
        className={classes.questionInput}
        data={exampleCities}
        onChange={onChange}
      />
      <TextInput
        {...form.getInputProps('expectedSalary.expectedSalary')}
        label="What is your expected salary?"
        className={classes.questionInput}
        height="md"
        rightSection={
          <Text c="dimmed">
            {form.values.expectedSalary.baseCurrency} ({symbol})
          </Text>
        }
      />
    </Container>
  );
};
