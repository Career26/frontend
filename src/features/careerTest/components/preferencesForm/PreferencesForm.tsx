import React from 'react';
import { Text } from '@mantine/core';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';

import { AreasOfInterestForm } from './AreasofInterestForm';
import { WorkStyleForm } from './WorkStyleForm';

export const PreferencesForm = ({ form }: { form: CareerFormProps }) => {
  const { classes } = questionFormStyles();
  return (
    <>
      <Text className={classes.questionTitle}>Preferences</Text>
      <AreasOfInterestForm form={form} />
      <WorkStyleForm form={form} />
    </>
  );
};
