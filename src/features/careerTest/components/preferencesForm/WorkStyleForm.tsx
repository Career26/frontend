import React from 'react';
import { Checkbox, Container, NumberInput, Select } from '@mantine/core';
import { WorkStyle } from '@datatypes/profile';
import { exampleCities } from '@careerTest/config/formConstants';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';

export const WorkStyleForm = ({ form }: { form: CareerFormProps }) => {
  const { classes } = questionFormStyles();

  const Icon = exampleCities.find((item) => item.value === form.values.expectedSalary.city)?.Icon;

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
          label="What is your preferred working style?"
          withAsterisk
          className={classes.questionInput}
          data={Object.entries(WorkStyle).map(([label, value]) => ({ label, value }))}
          {...form.getInputProps('personalityType.workStyle')}
        />
        <Checkbox
          className={classes.checkbox}
          label="Would you sacrifice your work-life balance?"
          {...form.getInputProps('personalityType.workLifeBalanceSacrifice')}
        />
      </div>
      <div className={classes.row}>
        <Select
          label="City"
          className={classes.questionInput}
          data={exampleCities}
          withAsterisk
          {...form.getInputProps('expectedSalary.city')}
          onChange={onSelectCity}
        />
        <NumberInput
          label="What is your expected salary?"
          withAsterisk
          icon={Icon && <Icon color="gray" size={20} />}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
              : ''
          }
          {...form.getInputProps('expectedSalary.expectedSalary')}
        />
      </div>
    </Container>
  );
};
