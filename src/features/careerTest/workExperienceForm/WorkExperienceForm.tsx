import { Button, Container, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { RemoveRowButton } from '@shared/components/forms/RemoveRowButton';
import { ExperienceForm } from './ExperienceForm';

import { initialWorkExperienceValues } from '@shared/constants/formConstants';

import type { CareerTestFormProps } from '@datatypes/careerTest';

import styles from '@careerTest/careerTest.module.css';

export const WorkExperienceForm = ({ form }: CareerTestFormProps) => {
  const workExperienceCount = form.values.previousWorkExperience.length;

  const onClickAddExperience = () => {
    form.setFieldValue('previousWorkExperience', [
      ...form.values.previousWorkExperience,
      initialWorkExperienceValues,
    ]);
  };

  const onClickRemoveExperience = (key: number) => {
    form.setFieldValue(
      'previousWorkExperience',
      form.values.previousWorkExperience.filter((_degree, i) => i !== key),
    );
  };

  return (
    <Container py="md" className={styles.container}>
      {[...Array(workExperienceCount).keys()].map((key) => {
        const baseKey = `previousWorkExperience.${key}`;
        return (
          <div key={baseKey}>
            <ExperienceForm
              title={key === 0 ? 'Your Previous Experience' : undefined}
              form={form}
              baseKey={baseKey}
              key={baseKey}
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
