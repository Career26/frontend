import React from 'react';
import { Select, TextInput, Textarea } from '@mantine/core';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { degreeLevels, degreeOptions, ratingOptions } from '@careerTest/config/formConstants';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import { getRatingLabel } from '@careerTest/utils/formUtil';

import { FormContent } from '../FormContent';

export const UniversityForm = ({
  form,
  baseKey,
  title,
}: {
  title?: string;
  form: CareerFormProps;
  baseKey: string;
}) => {
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
          label="Grade"
          data={degreeOptions}
          withAsterisk
          placeholder="Select a grade"
          w="50%"
        />
        <Select
          {...form.getInputProps(`${baseKey}.level`)}
          label="Degree"
          data={degreeLevels}
          withAsterisk
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
      />
      <Textarea
        {...form.getInputProps(`${baseKey}.ratingReason`)}
        label={getRatingLabel(rating, ratingReason?.length)}
        minRows={3}
        autosize
        py="xs"
        disabled={!rating}
      />
    </FormContent>
  );
};
