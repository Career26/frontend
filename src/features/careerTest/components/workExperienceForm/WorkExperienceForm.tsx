import { UseFormReturnType } from '@mantine/form';
import React from 'react';
import { Button, Container, Divider, Group, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Profile } from '@datatypes/profile';
import { initialWorkExperienceValues } from '@careerTest/config/formConstants';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';

import { CompanyForm } from './CompanyForm';
import { RemoveRowButton } from '../RemoveRowButton';

export const WorkExperienceForm = ({ form }: { form: UseFormReturnType<Profile> }) => {
  const { classes } = questionFormStyles();

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
    <>
      <Text className={classes.questionTitle}>Experience</Text>
      {[...Array(workExperienceCount).keys()].map((key) => {
        const baseKey = `previousWorkExperience.${key}`;
        return (
          <div key={baseKey}>
            {key > 0 && <Divider size="lg" className={classes.divider} />}
            <CompanyForm form={form} baseKey={baseKey} key={baseKey} />
            {key > 0 && key + 1 !== workExperienceCount && (
              <Container className={classes.removeButton}>
                <RemoveRowButton onClick={() => onClickRemoveExperience(key)} label="Experience" />
              </Container>
            )}
          </div>
        );
      })}
      <Container>
        <Group className={classes.row}>
          <Button leftIcon={<IconPlus />} onClick={onClickAddExperience}>
            Add Another Experience
          </Button>
          {workExperienceCount > 1 && (
            <RemoveRowButton
              label="Experience"
              onClick={() => onClickRemoveExperience(workExperienceCount - 1)}
            />
          )}
        </Group>
      </Container>
    </>
  );
};
