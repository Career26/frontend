import React from 'react';
import { Select, TextInput, Textarea } from '@mantine/core';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { ratingOptions } from '@careerTest/config/formConstants';
import { getRatingLabel } from '@careerTest/utils/formUtil';

export const CompanyForm = ({ form, baseKey }: { form: CareerFormProps; baseKey: string }) => {
  const rating = form.getInputProps(`${baseKey}.rating`).value;
  return (
    <div>
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
        label={getRatingLabel(rating)}
        minRows={3}
        autosize
        withAsterisk
        py="xs"
      />
    </div>
  );
};
