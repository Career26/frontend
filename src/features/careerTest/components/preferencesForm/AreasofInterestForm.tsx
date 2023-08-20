import { UseFormReturnType } from '@mantine/form';
import React, { useState } from 'react';
import { ActionIcon, Autocomplete, Chip, Container, Group } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { Profile } from '@datatypes/profile';
import { exampleAreasOfInterest } from '@careerTest/config/formConstants';
import { questionFormStyles } from '@careerTest/styles/careeerTestStyles';

export const AreasOfInterestForm = ({ form }: { form: UseFormReturnType<Profile> }) => {
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
      <div className={classes.questionInput}>
        <Autocomplete
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
        <div className={classes.chipSelectionRow}>
          <Chip.Group>
            <Group position="center">
              {areasOfInterest.map((interest) => (
                <Chip key={`${interest}-chip`}>
                  <div className={classes.chip}>
                    {interest}
                    <ActionIcon onClick={() => removeInterest(interest)} size="sm">
                      <IconX />
                    </ActionIcon>
                  </div>
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        </div>
      </div>
    </Container>
  );
};
