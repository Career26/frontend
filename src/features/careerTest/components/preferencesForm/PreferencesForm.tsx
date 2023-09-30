import React from 'react';
import { Text } from '@mantine/core';
import { formStyles } from '@shared/styles/formStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';

import { AreasOfInterestForm } from './AreasofInterestForm';
import { WorkStyleForm } from './WorkStyleForm';

export const PreferencesForm = ({ form }: { form: CareerFormProps }) => {
  const { classes } = formStyles();
  return (
    <>
      <Text className={classes.questionTitle}>Preferences</Text>
      <AreasOfInterestForm form={form} />
      <WorkStyleForm form={form} />
    </>
  );
};
