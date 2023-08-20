import React, { useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { Checkbox, Container, NumberInput, Select } from '@mantine/core';
import { Profile, WorkStyle } from '@datatypes/profile';
import { exampleCities } from '@careerTest/config/formConstants';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';

export const WorkStyleForm = ({ form }: { form: UseFormReturnType<Profile> }) => {
  const { classes } = questionFormStyles();
  const [symbol, setSymbol] = useState('£');

  const onSelectCity = (value: string) => {
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
      <div className={classes.row}>
        <Select
          {...form.getInputProps('expectedSalary.city')}
          label="City"
          className={classes.questionInput}
          data={exampleCities}
          onChange={onSelectCity}
        />
        <NumberInput
          {...form.getInputProps('expectedSalary.expectedSalary')}
          label="What is your expected salary?"
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `${symbol} ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
              : `${symbol} `
          }
        />
      </div>
    </Container>
  );
};
