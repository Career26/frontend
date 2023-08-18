import { UseFormReturnType } from '@mantine/form';
import React, { useState } from 'react';
import { Button, Group, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Profile } from '@datatypes/profile';
import { initialWorkExperienceValues } from '@careerTest/config/formConstants';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';

import { CompanyForm } from './CompanyForm';

export const WorkExperienceForm = ({ form }: { form: UseFormReturnType<Profile> }) => {
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
