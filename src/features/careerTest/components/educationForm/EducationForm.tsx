import React from 'react';
import { Group, Button, Text, Divider, Container } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { initialUniversityValues } from '@careerTest/config/formConstants';
import { CareerFormProps } from '@careerTest/careerTestTypes';

import { UniversityForm } from './UniversityForm';
import { RemoveRowButton } from '../RemoveRowButton';

export const EducationForm = ({ form }: { form: CareerFormProps }) => {
  const additionalDegreesCount = form.values.additionalDegrees.length;

  const onClickAddUniversity = () => {
    form.setFieldValue('additionalDegrees', [
      ...form.values.additionalDegrees,
      initialUniversityValues,
    ]);
  };

  const onClickRemoveUniversity = (key: number) => {
    form.setFieldValue(
      'additionalDegrees',
      form.values.additionalDegrees.filter((_degree, i) => i !== key),
    );
  };

  return (
    <Container py="md">
      <Group justify="center">
        <Text fw="bold">Education</Text>
      </Group>
      <UniversityForm form={form} baseKey="latestDegree" />
      {[...Array(additionalDegreesCount).keys()].map((key) => {
        const baseKey = `additionalDegrees.${key}`;
        return (
          <div key={baseKey}>
            <Divider size="lg" />
            <UniversityForm form={form} baseKey={baseKey} />
            {key + 1 !== additionalDegreesCount && (
              <RemoveRowButton onClick={() => onClickRemoveUniversity(key)} label="University" />
            )}
          </div>
        );
      })}

      <Group py="md" justify={additionalDegreesCount ? 'space-between' : 'flex-end'}>
        {additionalDegreesCount && (
          <RemoveRowButton
            label="University"
            onClick={() => onClickRemoveUniversity(additionalDegreesCount - 1)}
          />
        )}
        <Button leftSection={<IconPlus />} onClick={onClickAddUniversity}>
          Add Another University
        </Button>
      </Group>
    </Container>
  );
};
