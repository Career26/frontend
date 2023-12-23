import { Group, Button, Container } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { RemoveRowButton } from '@shared/components/forms/RemoveRowButton';
import { UniversityForm } from './UniversityForm';

import { initialUniversityValues } from '@shared/constants/formConstants';

import type { CareerTestFormProps } from '@datatypes/careerTest';

import styles from '@careerTest/careerTest.module.css';

export const EducationForm = ({ form }: CareerTestFormProps) => {
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
    <Container py="md" className={styles.container}>
      <UniversityForm form={form} baseKey="latestDegree" title="Your Education History" />
      {[...Array(additionalDegreesCount).keys()].map((key) => {
        const baseKey = `additionalDegrees.${key}`;
        return (
          <div key={baseKey}>
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
