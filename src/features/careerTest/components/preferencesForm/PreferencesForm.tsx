import React from 'react';
import { Container, Group, Text } from '@mantine/core';
import { CareerFormProps } from '@careerTest/careerTestTypes';

import { AreasOfInterestForm } from './AreasofInterestForm';
import { WorkStyleForm } from './WorkStyleForm';

export const PreferencesForm = ({ form }: { form: CareerFormProps }) => (
  <Container py="md">
    <Group justify="center">
      <Text fw="bold" size="1.5rem">
        Preferences
      </Text>
    </Group>
    <AreasOfInterestForm form={form} />
    <WorkStyleForm form={form} />
  </Container>
);
