import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { FormikContextType } from 'formik';
import { CareersFormValues, PreferencesFormValues } from '@careersTest/types/careersFormTypes';
import { basicInterestsList } from '@careersTest/config/careersFormConstants';

type InterestsSelectorProps = {
  formik: FormikContextType<CareersFormValues>;
};

export const InterestsSelector = ({ formik }: InterestsSelectorProps) => {
  const [newInterest, setNewInterest] = useState('');
  const selectedInterests = formik.values.areasOfInterest || [];

  const handleSetItems = (value: string[]) => {
    formik.setFieldValue('areasOfInterest', value);
  };

  const handleDeleteItem = (indexToDelete: number) => {
    const newOptions = selectedInterests.filter((_item, index) => index !== indexToDelete);
    handleSetItems(newOptions);
  };

  const disabled = selectedInterests.length > 2;

  return (
    <Autocomplete
      multiple
      id="multiple-select-chips"
      options={basicInterestsList}
      getOptionDisabled={() => disabled}
      value={selectedInterests}
      inputValue={newInterest}
      onChange={(_e, value) => handleSetItems(value)}
      noOptionsText="Add new interest (press enter)"
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Add an interest"
          onChange={(e) => setNewInterest(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newInterest.trim() !== '') {
              const newInterests = [...selectedInterests, newInterest];
              handleSetItems(newInterests);
              setNewInterest('');
            }
          }}
          disabled={disabled}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option}
            {...getTagProps({ index })}
            key={`selected-interest-${index}`}
            onDelete={() => handleDeleteItem(index)}
          />
        ))
      }
    />
  );
};
