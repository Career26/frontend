import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { basicInterestsList } from '@careersTest/config/careersFormConstants';
import { FormikContextType } from 'formik';
import { AreasOfInterestFormValues } from '@careersTest/types/careersFormTypes';
import Divider from '@mui/material/Divider';

import { InterestCard } from '../cards/InterestCard';

type AreasOfInterestFormProps = {
  formik: FormikContextType<AreasOfInterestFormValues>;
};

export const AreasOfInterestForm = ({ formik }: AreasOfInterestFormProps) => {
  const areasOfInterest = formik.values.areasOfInterest || [];
  const [availableInterests, setAvailableInterests] = useState<string[]>(basicInterestsList);
  const [newInterest, setNewInterest] = useState('');

  const removeInterest = (name: string) => {
    const newInterests = [...areasOfInterest].filter((interest) => interest !== name);
    formik.setFieldValue('areasOfInterest', newInterests);
  };

  const addInterest = (name: string) => {
    const newInterests = [...areasOfInterest, name];
    formik.setFieldValue('areasOfInterest', newInterests);
  };

  const clickInterest = (name: string) => {
    if (areasOfInterest.includes(name)) {
      removeInterest(name);
    } else {
      addInterest(name);
    }
  };

  const handleNewItemClick = () => {
    if (newInterest && !availableInterests.includes(newInterest)) {
      setAvailableInterests([...availableInterests, newInterest]);
      addInterest(newInterest);
      setNewInterest('');
    }
  };

  return (
    <div className="dialogContainer">
      <div className="header">Areas of Interest</div>
      <Divider />
      <TextField
        label="Add interest"
        value={newInterest}
        onChange={(e) => setNewInterest(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleNewItemClick();
          }
        }}
      />
      <div className="dialogContent">
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          {availableInterests.map((name, i) => (
            <Grid item key={`interest-${i}`} sx={{ padding: '8px' }}>
              <InterestCard
                name={name}
                onClick={() => clickInterest(name)}
                selected={areasOfInterest.includes(name)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
