import { selectCareerPaths } from '@apis/profileApi';
import { Select, createStyles } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { selectSelectedCareerPathId } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import React from 'react';

const navigationStyles = createStyles({
  selector: {
    width: '35%',
    ':&hover': {
      cursor: 'pointer',
    },
  },
});

export const CareerNavigation = () => {
  const { classes } = navigationStyles();
  const { toggleCareerId, showNavigation } = usePageNavigation();
  const careerPaths = useAppSelector(selectCareerPaths);
  const selectedCareerPathId = useAppSelector(selectSelectedCareerPathId);

  if (!careerPaths || !showNavigation) {
    return null;
  }
  const onChange = (careerId: string) => {
    toggleCareerId(careerId);
  };
  return (
    <div className={classes.selector}>
      <Select
        placeholder="Select Career"
        value={selectedCareerPathId}
        data={Object.entries(careerPaths).map(([careerId, { title }]) => ({
          label: title,
          value: careerId,
        }))}
        onChange={onChange}
      />
    </div>
  );
};
