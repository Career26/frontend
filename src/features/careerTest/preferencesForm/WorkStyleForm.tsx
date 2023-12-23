import { NumberInput, Select } from '@mantine/core';

import { exampleCities, workLifeOptions, workStyleOptions } from '@shared/constants/formConstants';

import type { CareerTestFormProps } from '@datatypes/careerTest';

import commonStyles from '@shared/styles/commonStyles.module.css';

export const WorkStyleForm = ({ form }: CareerTestFormProps) => {
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
          data={workStyleOptions}
          w="50%"
        />
        <Select
          {...form.getInputProps('personalityType.workValue')}
          label="What do you value the most in a career?"
          withAsterisk
          data={workLifeOptions}
          w="50%"
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
          label="What is your expected starting salary?"
          withAsterisk
          thousandSeparator=","
          leftSection={Icon && <Icon color="gray" size={20} />}
          w="50%"
        />
      </div>
    </div>
  );
};
