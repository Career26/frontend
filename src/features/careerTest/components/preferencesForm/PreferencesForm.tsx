import React from 'react';
import { Container } from '@mantine/core';
import { CareerFormProps } from '@careerTest/careerTestTypes';

import { AreasOfInterestForm } from './AreasofInterestForm';
import { WorkStyleForm } from './WorkStyleForm';
import { FormContent } from '../FormContent';

export const PreferencesForm = ({ form }: { form: CareerFormProps }) => (
  <Container py="md">
    <FormContent title="Preferences">
      <AreasOfInterestForm form={form} />
      <WorkStyleForm form={form} />
    </FormContent>
  </Container>
);
