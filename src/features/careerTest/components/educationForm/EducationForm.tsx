import React from 'react';
import { Group, Button, Text, Divider, Container } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { initialUniversityValues } from '@careerTest/config/formConstants';
import formStyles from '@shared/styles/formStyles.module.scss';
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
    <>
      <Text className={formStyles.questionTitle}>Education</Text>
      <UniversityForm form={form} baseKey="latestDegree" />
      {[...Array(additionalDegreesCount).keys()].map((key) => {
        const baseKey = `additionalDegrees.${key}`;
        return (
          <div key={baseKey}>
            <Divider size="lg" className={formStyles.divider} />
            <UniversityForm form={form} baseKey={baseKey} />
            {key + 1 !== additionalDegreesCount && (
              <Container className={formStyles.removeButton}>
                <RemoveRowButton onClick={() => onClickRemoveUniversity(key)} label="University" />
              </Container>
            )}
          </div>
        );
      })}
      <Container>
        <Group className={formStyles.row}>
          <Button leftSection={<IconPlus />} onClick={onClickAddUniversity}>
            Add Another University
          </Button>
          {additionalDegreesCount && (
            <RemoveRowButton
              label="University"
              onClick={() => onClickRemoveUniversity(additionalDegreesCount - 1)}
            />
          )}
        </Group>
      </Container>
    </>
  );
};
