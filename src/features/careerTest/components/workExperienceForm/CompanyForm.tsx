import React from 'react';
import { Select, TextInput, Textarea } from '@mantine/core';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { ratingOptions } from '@careerTest/config/formConstants';
import { getRatingLabel } from '@careerTest/utils/formUtil';

import { FormContent } from '../FormContent';

export const CompanyForm = ({
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
      <TextInput
        {...form.getInputProps(`${baseKey}.companyName`)}
        label="Company Name"
        withAsterisk
        py="xs"
      />
      <TextInput {...form.getInputProps(`${baseKey}.role`)} label="Role" withAsterisk />
      <Select
        {...form.getInputProps(`${baseKey}.rating`)}
        withAsterisk
        label="Rating"
        data={ratingOptions}
        placeholder="Select a rating"
        py="xs"
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
