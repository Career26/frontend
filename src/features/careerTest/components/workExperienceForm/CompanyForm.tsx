import React from 'react';
import { Container, Select, TextInput, Textarea } from '@mantine/core';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { ratingOptions } from '@careerTest/config/formConstants';

export const CompanyForm = ({ form, baseKey }: { form: CareerFormProps; baseKey: string }) => {
  const { classes } = questionFormStyles();
  const rating = form.getInputProps(`${baseKey}.rating`).value;

  const getRatingLabel = () => {
    switch (rating) {
      case '1':
        return 'Why did you hate it?';
      case '2':
        return 'Why did you dislike it?';
      case '4':
        return 'Why did you like it?';
      case '5':
        return 'Why did you love it?';
      default:
        return 'Provide a reason for this rating';
    }
  };

  return (
    <Container className={classes.questionContainer}>
      <TextInput
        label="Company Name"
        withAsterisk
        className={classes.questionInput}
        {...form.getInputProps(`${baseKey}.companyName`)}
      />
      <TextInput
        label="Role"
        withAsterisk
        className={classes.questionInput}
        {...form.getInputProps(`${baseKey}.role`)}
      />
      <Select
        {...form.getInputProps(`${baseKey}.rating`)}
        withAsterisk
        label="Rating"
        className={classes.questionInput}
        data={ratingOptions}
      />

      <Textarea
        label={getRatingLabel()}
        minRows={3}
        withAsterisk
        className={classes.questionInput}
        {...form.getInputProps(`${baseKey}.ratingReason`)}
      />
    </Container>
  );
};
