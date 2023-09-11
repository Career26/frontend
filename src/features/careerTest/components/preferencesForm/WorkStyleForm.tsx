import React from 'react';
import { Checkbox, Container, NumberInput, Select } from '@mantine/core';
import { WorkStyle } from '@datatypes/profile';
import { exampleCities } from '@careerTest/config/formConstants';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';

export const WorkStyleForm = ({ form }: { form: CareerFormProps }) => {
  const { classes } = questionFormStyles();

  const symbol = exampleCities.find((item) => item.value === form.values.expectedSalary.city)
    ?.symbol;

  const onSelectCity = (value: string) => {
    const city = exampleCities.find((item) => item.value === value);
    if (!city) {
      return;
    }
    form.setFieldValue('expectedSalary.city', city.value);
    form.setFieldValue('expectedSalary.baseCurrency', city.baseCurrency);
  };

  return (
    <Container className={classes.questionContainer}>
      <div className={classes.row}>
        <Select
          {...form.getInputProps('personalityType.workStyle')}
          label="What is your preferred working style?"
          withAsterisk
          className={classes.questionInput}
          data={Object.entries(WorkStyle).map(([label, value]) => ({ label, value }))}
        />
        <Checkbox
          className={classes.checkbox}
          {...form.getInputProps('personalityType.workLifeBalanceSacrifice')}
          label="Would you sacrifice your work-life balance?"
        />
      </div>
      <div className={classes.row}>
        <Select
          {...form.getInputProps('expectedSalary.city')}
          label="City"
          className={classes.questionInput}
          data={exampleCities}
          withAsterisk
          onChange={onSelectCity}
        />
        <NumberInput
          {...form.getInputProps('expectedSalary.expectedSalary')}
          label="What is your expected salary?"
          parser={(value) => value.replace(/[ $£€¥,]/gm, '')}
          withAsterisk
          formatter={(value: string) =>
            !Number.isNaN(parseFloat(value))
              ? `${symbol} ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
              : `${symbol} `
          }
        />
      </div>
    </Container>
  );
};
