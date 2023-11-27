import { CareerFormProps } from '@careerTest/careerTestTypes';
import { Accordion, Container, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React from 'react';
import { YesNoPreferNotToSay, Ethnicity, Gender, SchoolType } from '@datatypes/profile';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import { IconInfoCircle } from '@tabler/icons-react';

import { FormContent } from '../FormContent';
import { SelectHousehold } from './SelectHousehold';

const yesNoPreferOptions = Object.entries(YesNoPreferNotToSay).map(([label, value]) => ({
  label,
  value,
}));

export const DiversityForm = ({ form }: { form: CareerFormProps }) => (
  <Container py="md">
    <FormContent title="Diversity and Inclusion (Optional)">
      <div className={commonStyles.row}>
        <Accordion w="100%">
          <Accordion.Item value="why">
            <Accordion.Control icon={<IconInfoCircle />}>
              Why do we ask for this information?
            </Accordion.Control>
            <Accordion.Panel>
              To get the most accurate results, these answers can be used to:
              <ul>
                <li>Provide insights into careers you may not have considered</li>
                <li>Suggest tailored opportunities based on your background</li>
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
          data={yesNoPreferOptions}
          searchable
        />
      </div>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps('diversity.schoolType')}
          w="100%"
          label="What was the main type of school you attended for your secondary education?"
          data={Object.entries(SchoolType).map(([label, value]) => ({ label, value }))}
          searchable
        />
      </div>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps('diversity.ethnicity')}
          w="100%"
          label="What is your ethnicity?"
          data={Object.entries(Ethnicity).map(([label, value]) => ({ label, value }))}
          searchable
        />
      </div>
      <div className={commonStyles.row}>
        <Select
          {...form.getInputProps('diversity.gender')}
          w="100%"
          label="What is your current gender identity?"
          data={Object.entries(Gender).map(([label, value]) => ({ label, value }))}
          searchable
        />
      </div>
      <div className={commonStyles.row}>
        <SelectHousehold form={form} />
      </div>
      <div className={commonStyles.row}>
        <DateInput
          {...form.getInputProps('diversity.age')}
          label="What is your date of birth?"
          maxDate={new Date()}
          clearable
          placeholder="YYYY-MM-DD"
          valueFormat="YYYY-MM-DD"
        />
      </div>
    </FormContent>
  </Container>
);