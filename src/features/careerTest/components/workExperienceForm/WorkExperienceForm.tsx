import { UseFormReturnType } from '@mantine/form';
import { ProfileInput } from '@shared/types/careerTestTypes';
import React, { useState } from 'react';
import { initialWorkExperienceValues } from '../../config/formConstants';
import { questionFormStyles } from '../../styles/careeerTestStyles';
import { Button, Group, Text } from '@mantine/core';
import { CompanyForm } from './CompanyForm';
import { IconPlus } from '@tabler/icons-react';

export const WorkExperienceForm = ({ form }: { form: UseFormReturnType<ProfileInput> }) => {
  const { classes } = questionFormStyles();

  const [workExperienceCount, setWorkExperienceCount] = useState(1);

  const onClickAddExperience = () => {
    form.setFieldValue('previousWorkExperience', [
      ...form.values.previousWorkExperience,
      initialWorkExperienceValues,
    ]);
    setWorkExperienceCount(workExperienceCount + 1);
  };

  return (
    <>
      <Text className={classes.questionTitle}>Company</Text>
      {[...Array(workExperienceCount).keys()].map((key) => {
        const baseKey = `previousWorkExperience.${key}`;
        return <CompanyForm form={form} baseKey={baseKey} key={baseKey} />;
      })}
      <Group position="left">
        <Button leftIcon={<IconPlus />} onClick={onClickAddExperience}>
          Add Another Experience
        </Button>
      </Group>
    </>
  );
};
