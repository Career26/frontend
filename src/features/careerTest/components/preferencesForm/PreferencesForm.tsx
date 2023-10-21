import React from 'react';
import { Text } from '@mantine/core';
import formStyles from '@shared/styles/formStyles.module.scss';
import { CareerFormProps } from '@careerTest/careerTestTypes';

import { AreasOfInterestForm } from './AreasofInterestForm';
import { WorkStyleForm } from './WorkStyleForm';

export const PreferencesForm = ({ form }: { form: CareerFormProps }) => (
  <>
    <Text className={formStyles.questionTitle}>Preferences</Text>
    <AreasOfInterestForm form={form} />
    <WorkStyleForm form={form} />
  </>
);
