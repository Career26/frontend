import React from 'react';
import { Group, Button, Text, Divider, Container } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { initialUniversityValues } from '@careerTest/config/formConstants';
import { questionFormStyles } from '@careerTest/styles/careerTestStyles';
import { CareerFormProps } from '@careerTest/careerTestTypes';

import { UniversityForm } from './UniversityForm';
import { RemoveRowButton } from '../RemoveRowButton';

export const EducationForm = ({ form }: { form: CareerFormProps }) => {
  const { classes } = questionFormStyles();

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
      <Text className={classes.questionTitle}>Education</Text>
      <UniversityForm form={form} baseKey="latestDegree" />
      {[...Array(additionalDegreesCount).keys()].map((key) => {
        const baseKey = `additionalDegrees.${key}`;
        return (
          <div key={baseKey}>
            <Divider size="lg" className={classes.divider} />
            <UniversityForm form={form} baseKey={baseKey} />
            {key + 1 !== additionalDegreesCount && (
              <Container className={classes.removeButton}>
                <RemoveRowButton onClick={() => onClickRemoveUniversity(key)} label="University" />
              </Container>
            )}
          </div>
        );
      })}
      <Container>
        <Group className={classes.row}>
          <Button leftIcon={<IconPlus />} onClick={onClickAddUniversity}>
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
