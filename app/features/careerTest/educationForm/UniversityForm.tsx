import { Select, TextInput, Textarea } from '@mantine/core';

import { FormContent } from '@shared/components/forms/FormContent';

import { getRatingLabel } from '@shared/utils/formUtil';
import { degreeLevels, degreeOptions, ratingOptions } from '@shared/constants/formConstants';

import type { SubFormProps } from '@datatypes/careerTest';

import commonStyles from '@shared/styles/commonStyles.module.css';

export const UniversityForm = ({ form, baseKey, title }: SubFormProps) => {
  const rating = form.getInputProps(`${baseKey}.rating`).value;
  const ratingReason = form.getInputProps(`${baseKey}.ratingReason`).value;
  return (
    <FormContent title={title}>
      <div className={commonStyles.row}>
        <TextInput
          {...form.getInputProps(`${baseKey}.university`)}
          label="University Name"
          withAsterisk
          w="50%"
        />
        <TextInput
          {...form.getInputProps(`${baseKey}.name`)}
          label="Course Name"
          withAsterisk
          w="50%"
        />
      </div>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps(`${baseKey}.grade`)}
          label="Achieved/Expected Grade"
          data={degreeOptions}
          withAsterisk
          placeholder="Select a grade"
          w="50%"
          searchable
        />
        <Select
          {...form.getInputProps(`${baseKey}.level`)}
          label="Degree"
          data={degreeLevels}
          withAsterisk
          searchable
          placeholder="Select a level"
          w="50%"
        />
      </div>
      <Select
        {...form.getInputProps(`${baseKey}.rating`)}
        label="Course Rating"
        data={ratingOptions}
        placeholder="Select a rating"
        py="xs"
        searchable
        withAsterisk
      />
      <Textarea
        {...form.getInputProps(`${baseKey}.ratingReason`)}
        label={getRatingLabel(rating, ratingReason?.length)}
        minRows={3}
        autosize
        py="xs"
        withAsterisk
      />
    </FormContent>
  );
};
