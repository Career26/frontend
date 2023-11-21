import React from 'react';
import { Select, TextInput, Textarea } from '@mantine/core';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { experienceOptions, ratingOptions } from '@careerTest/config/formConstants';
import { getRatingLabel } from '@shared/utils/formUtil';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import { ExperienceType } from '@datatypes/profile';

import { FormContent } from '../FormContent';

const getNameLabel = (experienceType: ExperienceType) => {
  const label = experienceOptions.find((item) => item.value === experienceType)?.label;
  switch (experienceType) {
    case ExperienceType.Volunteering:
      return 'Organisation';
    case ExperienceType.Other:
    case undefined:
      return '';
    default:
      return label;
  }
};

export const ExperienceForm = ({
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
  const experienceType = form.getInputProps(`${baseKey}.experienceType`).value;
  const experienceLabel = getNameLabel(experienceType);
  return (
    <FormContent title={title}>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps(`${baseKey}.experienceType`)}
          withAsterisk
          label="Type"
          placeholder="Select experience type"
          data={experienceOptions}
          w="50%"
          searchable
        />
        <TextInput
          {...form.getInputProps(`${baseKey}.experienceName`)}
          label={`${experienceLabel} Name`}
          withAsterisk
          py="xs"
          w="50%"
        />
      </div>
      <TextInput {...form.getInputProps(`${baseKey}.role`)} label="Role" withAsterisk />
      <Select
        {...form.getInputProps(`${baseKey}.rating`)}
        withAsterisk
        label="What did you think of this role?"
        data={ratingOptions}
        placeholder="Select a rating"
        py="xs"
        searchable
      />

      <Textarea
        {...form.getInputProps(`${baseKey}.ratingReason`)}
        label={getRatingLabel(rating, ratingReason.length)}
        minRows={3}
        autosize
        withAsterisk
        py="xs"
      />
    </FormContent>
  );
};
