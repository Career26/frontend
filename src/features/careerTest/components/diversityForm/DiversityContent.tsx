import { CareerFormProps } from '@careerTest/careerTestTypes';
import { Accordion, Select } from '@mantine/core';
import React from 'react';
import { YesNoPreferNotToSay, Ethnicity, Gender, SchoolType } from '@datatypes/profile';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import { IconInfoCircle } from '@tabler/icons-react';

const yesNoPreferOptions = Object.entries(YesNoPreferNotToSay).map(([label, value]) => ({
  label,
  value,
}));

export const DiversityContent = ({ form }: { form: CareerFormProps }) => (
  <>
    <div className={commonStyles.row}>
      <Accordion w="100%">
        <Accordion.Item value="why">
          <Accordion.Control icon={<IconInfoCircle />}>
            Why do we ask for this information?
          </Accordion.Control>
          <Accordion.Panel>
            We use the answer to:
            <ul>
              <li>Provide you with career options you may not have considered</li>
              <li>Match you with mentors from shared backgrounds</li>
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
  </>
);
