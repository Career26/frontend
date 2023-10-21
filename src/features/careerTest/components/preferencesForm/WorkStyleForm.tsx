import React from 'react';
import { Checkbox, Container, NumberInput, Select } from '@mantine/core';
import { WorkStyle } from '@datatypes/profile';
import { exampleCities } from '@careerTest/config/formConstants';
import { formStyles } from '@shared/styles/formStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';

export const WorkStyleForm = ({ form }: { form: CareerFormProps }) => {
  const { classes } = formStyles();

  const Icon = exampleCities.find((item) => item.value === form.values.expectedSalary.city)?.Icon;

  const onSelectCity = (value: string | null) => {
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
          {...form.getInputProps('personalityType.workLifeBalanceSacrifice')}
          className={classes.checkbox}
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
          withAsterisk
          thousandSeparator=","
          leftSection={Icon && <Icon color="gray" size={20} />}
        />
      </div>
    </Container>
  );
};
