import { Group, Button, Container } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { RemoveRowButton } from '@shared/components/forms/RemoveRowButton';
import { UniversityForm } from './UniversityForm';

import {
  initiaBasiclUniversityValues,
  initialUniversityValues,
} from '@shared/constants/formConstants';

import type { UseFormReturnType } from '@mantine/form';
import type { FormFieldWithArray, MappedArrayValue } from '@datatypes/form';
import type { Degree } from '@datatypes/profile';
import type { BasicDegree } from '@datatypes/network';

import styles from '@careerTest/careerTest.module.css';

interface EducationFormProps<T> {
  form: UseFormReturnType<T>;
  firstField: string;
  additionalField: FormFieldWithArray<T>;
  basic?: boolean;
}

const EducationForm = <T,>({ form, firstField, additionalField, basic }: EducationFormProps<T>) => {
  const additionalDegrees = form.values[additionalField] as (Degree | BasicDegree)[];
  const additionalDegreesCount = additionalDegrees.length;

  const onClickAddUniversity = () => {
    const newValue = [
      ...additionalDegrees,
      basic ? initiaBasiclUniversityValues : initialUniversityValues,
    ] as MappedArrayValue<T>;
    form.setFieldValue(additionalField, newValue);
  };

  const onClickRemoveUniversity = (key: number) => {
    form.setFieldValue(
      additionalField,
      additionalDegrees.filter((_degree, i) => i !== key) as MappedArrayValue<T>,
    );
  };

  return (
    <Container py="md" className={styles.container}>
      <UniversityForm form={form} baseKey={firstField} title="Your Education History" />
      {[...Array(additionalDegreesCount).keys()].map((key) => {
        const baseKey = `${additionalField}.${key}`;
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

export default EducationForm;
