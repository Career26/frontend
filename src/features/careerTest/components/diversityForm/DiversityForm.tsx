import { CareerFormProps } from '@careerTest/careerTestTypes';
import { Accordion, Container, Select } from '@mantine/core';
import React from 'react';
import {
  Age,
  Disability,
  Ethnicity,
  FirstGeneration,
  Gender,
  SchoolType,
} from '@datatypes/profile';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import { IconInfoCircle } from '@tabler/icons-react';

import { FormContent } from '../FormContent';

export const DiversityForm = ({ form }: { form: CareerFormProps }) => (
  <Container py="md">
    <FormContent title="Diversity and Inclusion">
      <div className={commonStyles.row}>
        <Accordion w="100%">
          <Accordion.Item value="why">
            <Accordion.Control icon={<IconInfoCircle />}>
              Why do we ask for this information?
            </Accordion.Control>
            <Accordion.Panel>
              To get the most accurate results, these answers can be used to:
              <ul>
                <li>
                  Suggest career paths that previous users with similar backgrounds to yourself have
                  found
                </li>
                <li>
                  Start building your mentor network to connect with users with similar backgrounds
                </li>
              </ul>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps('diversity.firstGeneration')}
          w="100%"
          label="Are you the first generation in your family to attend univeristy?"
          data={Object.entries(FirstGeneration).map(([label, value]) => ({ label, value }))}
        />
      </div>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps('diversity.schoolType')}
          w="100%"
          label="What was the main type of school you attended for your secondary education?"
          data={Object.entries(SchoolType).map(([label, value]) => ({ label, value }))}
        />
      </div>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps('diversity.ethnicity')}
          w="100%"
          label="What is your ethnicity?"
          data={Object.entries(Ethnicity).map(([label, value]) => ({ label, value }))}
        />
      </div>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps('diversity.gender')}
          w="100%"
          label="What is your gender?"
          data={Object.entries(Gender).map(([label, value]) => ({ label, value }))}
        />
      </div>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps('diversity.disability')}
          w="100%"
          label="What is your disability status?"
          data={Object.entries(Disability).map(([label, value]) => ({ label, value }))}
        />
      </div>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps('diversity.age')}
          w="100%"
          label="What is your age group?"
          data={Object.entries(Age).map(([label, value]) => ({ label, value }))}
        />
      </div>
    </FormContent>
  </Container>
);
