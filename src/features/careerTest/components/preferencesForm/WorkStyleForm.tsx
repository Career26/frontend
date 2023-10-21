import React from 'react';
import { Checkbox, NumberInput, Select } from '@mantine/core';
import { WorkStyle } from '@datatypes/profile';
import { exampleCities } from '@careerTest/config/formConstants';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import styles from '@careerTest/careerTestStyles.module.scss';

export const WorkStyleForm = ({ form }: { form: CareerFormProps }) => {
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
    <div>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps('personalityType.workStyle')}
          label="What is your preferred working style?"
          withAsterisk
          data={Object.entries(WorkStyle).map(([label, value]) => ({ label, value }))}
          w="50%"
        />
        <Checkbox
          {...form.getInputProps('personalityType.workLifeBalanceSacrifice')}
          className={styles.workLifeCheckbox}
          label="Would you sacrifice your work-life balance?"
        />
      </div>

      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps('expectedSalary.city')}
          label="City"
          data={exampleCities}
          withAsterisk
          onChange={onSelectCity}
          w="50%"
        />
        <NumberInput
          {...form.getInputProps('expectedSalary.expectedSalary')}
          label="What is your expected salary?"
          withAsterisk
          thousandSeparator=","
          leftSection={Icon && <Icon color="gray" size={20} />}
          w="50%"
        />
      </div>
    </div>
  );
};
