import { UseFormReturnType } from '@mantine/form';
import React from 'react';
import { Container, Select, TextInput, Textarea } from '@mantine/core';
import { Profile } from '@datatypes/profile';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';

export const CompanyForm = ({
  form,
  baseKey,
}: {
  form: UseFormReturnType<Profile>;
  baseKey: string;
}) => {
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
      <Select
        {...form.getInputProps(`${baseKey}.rating`)}
        label="Rating"
        className={classes.questionInput}
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
        label="Role"
        minRows={3}
        className={classes.questionInput}
      />
    </Container>
  );
};
