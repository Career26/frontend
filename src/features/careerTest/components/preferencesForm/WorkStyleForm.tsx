import React, { useState } from 'react';

import { questionFormStyles } from '../../styles/careeerTestStyles';
import { UseFormReturnType } from '@mantine/form';
import { ProfileInput, WorkType } from '@shared/types/careerTestTypes';
import { Checkbox, Container, Select, Text, TextInput } from '@mantine/core';

const exampleCities = [
  { value: 'London', label: 'London', baseCurrency: 'GBP', symbol: '£' },
  { value: 'New York', label: 'New York', baseCurrency: 'USD', symbol: '$' },
  { value: 'Tokyo', label: 'Tokyo', baseCurrency: 'JPY', symbol: '¥' },
  { value: 'Sydney', label: 'Sydney', baseCurrency: 'AUD', symbol: '$' },
  { value: 'Hong Kong', label: 'Hong Kong', baseCurrency: 'HKD', symbol: '$' },
  { value: 'Shanghai', label: 'Shanghai', baseCurrency: 'RMB', symbol: '¥' },
];

export const WorkStyleForm = ({ form }: { form: UseFormReturnType<ProfileInput> }) => {
  const { classes } = questionFormStyles();
  const [symbol, setSymbol] = useState('£');

  const onChange = (value: string) => {
    const city = exampleCities.find((item) => item.value === value)!;
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
        data={Object.values(WorkType)}
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
