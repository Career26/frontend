import { Container } from '@mantine/core';

import { FormContent } from '@shared/components/forms/FormContent';
import { AreasOfInterestForm } from './AreasofInterestForm';
import { WorkStyleForm } from './WorkStyleForm';

import type { CareerTestFormProps } from '@datatypes/careerTest';

export const PreferencesForm = ({ form }: CareerTestFormProps) => (
  <Container py="md">
    <FormContent title="Preferences">
      <AreasOfInterestForm form={form} />
      <WorkStyleForm form={form} />
    </FormContent>
  </Container>
);
