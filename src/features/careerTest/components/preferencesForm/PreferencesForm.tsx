import { UseFormReturnType } from '@mantine/form';
import React from 'react';
import { Text } from '@mantine/core';
import { Profile } from '@datatypes/profile';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';

import { AreasOfInterestForm } from './AreasofInterestForm';
import { WorkStyleForm } from './WorkStyleForm';

export const PreferencesForm = ({ form }: { form: UseFormReturnType<Profile> }) => {
  const { classes } = questionFormStyles();
  return (
    <>
      <Text className={classes.questionTitle}>Preferences</Text>
      <AreasOfInterestForm form={form} />
      <WorkStyleForm form={form} />
    </>
  );
};
