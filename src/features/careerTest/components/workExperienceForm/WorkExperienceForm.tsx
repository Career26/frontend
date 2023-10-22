import React from 'react';
import { Button, Container, Divider, Group, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { initialWorkExperienceValues } from '@careerTest/config/formConstants';
import formStyles from '@shared/styles/formStyles.module.scss';
import { CareerFormProps } from '@careerTest/careerTestTypes';

import { CompanyForm } from './CompanyForm';
import { RemoveRowButton } from '../RemoveRowButton';

export const WorkExperienceForm = ({ form }: { form: CareerFormProps }) => {
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
    <Container py="md">
      <Group justify="center">
        <Text fw="bold" size="1.5rem">
          Experience
        </Text>
      </Group>
      {[...Array(workExperienceCount).keys()].map((key) => {
        const baseKey = `previousWorkExperience.${key}`;
        return (
          <div key={baseKey}>
            {key > 0 && <Divider size="lg" className={formStyles.divider} />}
            <CompanyForm form={form} baseKey={baseKey} key={baseKey} />
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
