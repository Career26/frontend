import React from 'react';
import { Container, Select, TextInput, Textarea } from '@mantine/core';
import { formStyles } from '@shared/styles/formStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { ratingOptions } from '@careerTest/config/formConstants';
import { getRatingLabel } from '@careerTest/utils/formUtil';

export const CompanyForm = ({ form, baseKey }: { form: CareerFormProps; baseKey: string }) => {
  const { classes } = formStyles();
  const rating = form.getInputProps(`${baseKey}.rating`).value;
  return (
    <Container className={classes.questionContainer}>
      <TextInput
        {...form.getInputProps(`${baseKey}.companyName`)}
        label="Company Name"
        withAsterisk
        className={classes.questionInput}
      />
      <TextInput
        {...form.getInputProps(`${baseKey}.role`)}
        label="Role"
        withAsterisk
        className={classes.questionInput}
      />
      <Select
        {...form.getInputProps(`${baseKey}.rating`)}
        withAsterisk
        label="Rating"
        className={classes.questionInput}
        data={ratingOptions}
      />

      <Textarea
        {...form.getInputProps(`${baseKey}.ratingReason`)}
        label={getRatingLabel(rating)}
        minRows={3}
        withAsterisk
        className={classes.questionInput}
      />
    </Container>
  );
};
