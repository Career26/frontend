import { UseFormReturnType } from '@mantine/form';
import { ProfileInput } from '@shared/types/careerTestTypes';
import React, { useState } from 'react';
import { questionFormStyles } from '../../styles/careeerTestStyles';
import { ActionIcon, Autocomplete, Chip, Container, Group } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const exampleAreasOfInterest = [
  'Finance',
  'Business',
  'Law',
  'Consulting',
  'Education',
  'Technology',
  'Healthcare',
  'Charity',
  'Art and Creative Work',
  'Politics',
  'Public Services',
  'Academia / Research',
];

export const AreasOfInterestForm = ({ form }: { form: UseFormReturnType<ProfileInput> }) => {
  const { classes } = questionFormStyles();
  const [newInterest, setNewInterest] = useState('');

  const {
    values: { areasOfInterest },
  } = form;

  const addNewInterest = (value: string) => {
    form.setFieldValue('areasOfInterest', [...areasOfInterest, value]);
    setNewInterest('');
  };

  const removeInterest = (value: string) => {
    form.setFieldValue(
      'areasOfInterest',
      areasOfInterest.filter((interst) => interst !== value),
    );
  };

  const options = exampleAreasOfInterest.filter((value) => !areasOfInterest.includes(value));

  return (
    <Container className={classes.questionContainer}>
      <Autocomplete
        disabled={areasOfInterest.length > 2}
        label="Select up to 3 areas of interest"
        data={options}
        value={newInterest}
        onChange={(value) => setNewInterest(value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addNewInterest(newInterest);
          }
        }}
        nothingFound="Press Enter to add new interest"
        onItemSubmit={({ value }) => {
          addNewInterest(value);
        }}
        error={form.errors.areasOfInterest}
      />
      <Chip.Group>
        <Group position="center">
          {areasOfInterest.map((interest) => (
            <Chip key={`${interest}-chip`}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {interest}
                <ActionIcon onClick={() => removeInterest(interest)}>
                  <IconX />
                </ActionIcon>
              </div>
            </Chip>
          ))}
        </Group>
      </Chip.Group>
    </Container>
  );
};
