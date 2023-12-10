import { CareerFormProps } from '@careerTest/careerTestTypes';
import { Container } from '@mantine/core';
import React from 'react';

import { FormContent } from '../FormContent';
import { DiversityContent } from './DiversityContent';

export const DiversityForm = ({ form }: { form: CareerFormProps }) => (
  <Container py="md">
    <FormContent title="Diversity and Inclusion (Optional)">
      <DiversityContent form={form} />
    </FormContent>
  </Container>
);
