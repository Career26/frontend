import { selectCareerPaths } from '@apis/profileApi';
import { Select } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { selectSelectedCareerPathId } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import React from 'react';

import styles from './pageHeaderStyles.module.scss';

export const CareerNavigation = () => {
  const { toggleCareerId, showNavigation } = usePageNavigation();
  const careerPaths = useAppSelector(selectCareerPaths);
  const selectedCareerPathId = useAppSelector(selectSelectedCareerPathId);

  if (!careerPaths || !showNavigation) {
    return null;
  }
  const onChange = (careerId: string | null) => {
    if (!careerId) {
      return;
    }
    toggleCareerId(careerId);
  };
  return (
    <div className={styles.careerSelector}>
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
