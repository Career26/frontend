import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { InterestCard } from '../cards/InterestCard';

export const InterestsForm = () => {
  const [availableInterests, setAvailableInterests] = useState<string[]>(['x', 'y', 'z']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState('');

  const clickInterest = (name: string) => {
    if (selectedInterests.includes(name)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== name));
    } else {
      setSelectedInterests([...selectedInterests, name]);
    }
  };

  const handleNewItemClick = () => {
    if (newInterest && !availableInterests.includes(newInterest)) {
      setAvailableInterests([...availableInterests, newInterest]);
      setSelectedInterests([...selectedInterests, newInterest]);
      setNewInterest('');
    }
  };

  return (
    <div className="dialogContainer">
      <div className="dialogContent">
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          {availableInterests.map((name, i) => (
            <Grid item key={`interest-${i}`} sx={{ padding: '8px' }}>
              <InterestCard
                name={name}
                onClick={() => clickInterest(name)}
                selected={selectedInterests.includes(name)}
              />
            </Grid>
          ))}
        </Grid>
        <TextField
          label="New Item"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleNewItemClick();
            }
          }}
        />
      </div>
    </div>
  );
};
