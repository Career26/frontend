import { UseFormReturnType } from '@mantine/form';
import { ProfileInput } from '@shared/types/careerTestTypes';
import React from 'react';
import { questionFormStyles } from '../../styles/careeerTestStyles';
import { Text } from '@mantine/core';
import { AreasOfInterestForm } from './AreasofInterestForm';
import { WorkStyleForm } from './WorkStyleForm';

export const PreferencesForm = ({ form }: { form: UseFormReturnType<ProfileInput> }) => {
  const { classes } = questionFormStyles();
  return (
    <>
      <Text className={classes.questionTitle} />
      <AreasOfInterestForm form={form} />
      <WorkStyleForm form={form} />
    </>
  );
};
