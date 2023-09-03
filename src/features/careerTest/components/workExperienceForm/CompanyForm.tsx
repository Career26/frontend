import React from 'react';
import { Container, Select, TextInput, Textarea } from '@mantine/core';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';

export const CompanyForm = ({ form, baseKey }: { form: CareerFormProps; baseKey: string }) => {
  const { classes } = questionFormStyles();
  return (
    <Container className={classes.questionContainer}>
      <TextInput
        {...form.getInputProps(`${baseKey}.companyName`)}
        label="Company Name"
        className={classes.questionInput}
      />
      <TextInput
        {...form.getInputProps(`${baseKey}.role`)}
        label="Role"
        className={classes.questionInput}
      />
      {/* Add an info tooltip as to how to rate something */}
      <Select
        {...form.getInputProps(`${baseKey}.rating`)}
        label="Rating"
        className={classes.questionInput}
        type="number"
        data={[...Array(5).keys()].map((value) => {
          const inputValue = String(value + 1);
          return {
            value: inputValue,
            label: inputValue,
          };
        })}
      />
      <Textarea
        {...form.getInputProps(`${baseKey}.ratingReason`)}
        label="Reason for rating"
        minRows={3}
        className={classes.questionInput}
      />
    </Container>
  );
};
