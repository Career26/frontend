import { selectCareerPaths } from '@apis/profileApi';
import { UserProfile } from '@datatypes/profile';
import { ComboboxItem, Select } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { selectSelectedCareerPathId } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import React from 'react';

const getItems = (careerPaths: UserProfile['careerPaths'], checkSelected: boolean) =>
  Object.entries(careerPaths).reduce<ComboboxItem[]>((agg, [careerId, { title, selected }]) => {
    const booleanCheck = checkSelected ? selected : !selected;
    return booleanCheck ? [...agg, { value: careerId, label: title }] : agg;
  }, []);

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
  const careerOptions = [
    {
      group: 'Favourites',
      items: getItems(careerPaths, true),
    },
    {
      group: ' ',
      items: getItems(careerPaths, false),
    },
  ];

  return (
    <Select
      w="50%"
      placeholder="Select Career"
      value={selectedCareerPathId}
      data={careerOptions}
      onChange={onChange}
    />
  );
};
