import React from 'react';
import { Container, Select, TextInput, Textarea } from '@mantine/core';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';

export const CompanyForm = ({ form, baseKey }: { form: CareerFormProps; baseKey: string }) => {
  const { classes } = questionFormStyles();
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
      {/* Add an info tooltip as to how to rate something */}
      <Select
        label="Rating"
        withAsterisk
        className={classes.questionInput}
        type="number"
        data={[...Array(5).keys()].map((value) => {
          const inputValue = String(value + 1);
          return {
            value: inputValue,
            label: inputValue,
          };
        })}
        {...form.getInputProps(`${baseKey}.rating`)}
      />
      <Textarea
        label="Reason for rating"
        minRows={3}
        withAsterisk
        className={classes.questionInput}
        {...form.getInputProps(`${baseKey}.ratingReason`)}
      />
    </Container>
  );
};
