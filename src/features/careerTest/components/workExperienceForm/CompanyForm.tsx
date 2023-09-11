import React from 'react';
import { Container, Select, TextInput, Textarea, Tooltip } from '@mantine/core';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';
import { IconInfoCircle } from '@tabler/icons-react';

export const CompanyForm = ({ form, baseKey }: { form: CareerFormProps; baseKey: string }) => {
  const { classes } = questionFormStyles();
  const getRatingLabel = () => {
    const rating = Number(form.getInputProps(`${baseKey}.rating`).value);
    if (!rating || rating === 3) {
      return 'Reason for rating?';
    }
    if (rating > 3) {
      return 'Why did you love it?';
    }
    return 'Why did you hate it?';
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

      <div className={classes.ratingRow}>
        <Select
          withAsterisk
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
          {...form.getInputProps(`${baseKey}.rating`)}
        />
        <Tooltip label='Rate your experience from 1 to 5, with 5 being "I loved it!" to 1 being "I hated it!"'>
          <IconInfoCircle />
        </Tooltip>
      </div>
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
