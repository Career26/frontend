import { Button, Container, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { RemoveRowButton } from '@shared/components/forms/RemoveRowButton';
import { ExperienceForm } from './ExperienceForm';

import {
  initialBasicWorkExperienceValues,
  initialWorkExperienceValues,
} from '@shared/constants/formConstants';

import type { UseFormReturnType } from '@mantine/form';
import type { BasicExperience } from '@datatypes/network';
import type { Experience } from '@datatypes/profile';
import type { FormFieldWithArray, MappedArrayValue } from '@datatypes/form';

import styles from '@careerTest/careerTest.module.css';

interface WorkExperienceFormProps<T> {
  form: UseFormReturnType<T>;
  field: FormFieldWithArray<T>;
  basic?: boolean;
}

const WorkExperienceForm = <T,>({ form, field, basic }: WorkExperienceFormProps<T>) => {
  const workExperiences = form.values[field] as (BasicExperience | Experience)[];
  const workExperienceCount = workExperiences.length;

  const onClickAddExperience = () => {
    const newValue = [
      ...workExperiences,
      basic ? initialBasicWorkExperienceValues : initialWorkExperienceValues,
    ] as MappedArrayValue<T>;
    form.setFieldValue(field, newValue);
  };

  const onClickRemoveExperience = (key: number) => {
    form.setFieldValue(
      field,
      workExperiences.filter((_degree, i) => i !== key) as MappedArrayValue<T>,
    );
  };

  return (
    <Container py="md" className={styles.container}>
      {[...Array(workExperienceCount).keys()].map((key) => {
        const baseKey = `${field}.${key}`;
        return (
          <div key={baseKey}>
            <ExperienceForm
              title={key === 0 ? 'Your Previous Experience' : undefined}
              form={form}
              baseKey={baseKey}
              key={baseKey}
              basic
            />
            {key > 0 && key + 1 !== workExperienceCount && (
              <RemoveRowButton onClick={() => onClickRemoveExperience(key)} label="Experience" />
            )}
          </div>
        );
      })}

      <Group py="md" justify={workExperienceCount > 1 ? 'space-between' : 'flex-end'}>
        {workExperienceCount > 1 && (
          <RemoveRowButton
            label="Experience"
            onClick={() => onClickRemoveExperience(workExperienceCount - 1)}
          />
        )}
        <Button leftSection={<IconPlus />} onClick={onClickAddExperience}>
          Add Another Experience
        </Button>
      </Group>
    </Container>
  );
};

export default WorkExperienceForm;
