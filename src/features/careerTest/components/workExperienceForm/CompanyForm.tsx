import React from 'react';
import { Container, Select, TextInput, Textarea } from '@mantine/core';
import formStyles from '@shared/styles/formStyles.module.scss';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { ratingOptions } from '@careerTest/config/formConstants';
import { getRatingLabel } from '@careerTest/utils/formUtil';

export const CompanyForm = ({ form, baseKey }: { form: CareerFormProps; baseKey: string }) => {
  const rating = form.getInputProps(`${baseKey}.rating`).value;
  return (
    <Container className={formStyles.questionContainer}>
      <TextInput
        {...form.getInputProps(`${baseKey}.companyName`)}
        label="Company Name"
        withAsterisk
        className={formStyles.questionInput}
      />
      <TextInput
        {...form.getInputProps(`${baseKey}.role`)}
        label="Role"
        withAsterisk
        className={formStyles.questionInput}
      />
      <Select
        {...form.getInputProps(`${baseKey}.rating`)}
        withAsterisk
        label="Rating"
        className={formStyles.questionInput}
        data={ratingOptions}
        placeholder="Select a rating"
      />

      <Textarea
        {...form.getInputProps(`${baseKey}.ratingReason`)}
        label={getRatingLabel(rating)}
        minRows={3}
        withAsterisk
        className={formStyles.questionInput}
      />
    </Container>
  );
};
