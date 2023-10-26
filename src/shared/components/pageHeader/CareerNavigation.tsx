import { selectCareerPaths } from '@apis/profileApi';
import { UserProfile } from '@datatypes/profile';
import { ActionIcon, Button, ComboboxItem, Group, Menu, Select, Text } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { selectSelectedCareerPath, selectSelectedCareerPathId } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import { IconArrowDown, IconChevronDown, IconChevronUp, IconHeart } from '@tabler/icons-react';
import React, { useState } from 'react';

import styles from './headerStyles.module.scss';

const getItems = (careerPaths: UserProfile['careerPaths'], checkSelected: boolean) =>
  Object.entries(careerPaths).reduce<ComboboxItem[]>((agg, [careerId, { title, selected }]) => {
    const booleanCheck = checkSelected ? selected : !selected;
    return booleanCheck ? [...agg, { value: careerId, label: title }] : agg;
  }, []);

export const CareerNavigation = () => {
  const [open, setOpen] = useState(false);
  const { toggleCareerId, showNavigation } = usePageNavigation();
  const careerPaths = useAppSelector(selectCareerPaths);
  const selectedCareerPathId = useAppSelector(selectSelectedCareerPathId);
  const selectedCareerPath = useAppSelector(selectSelectedCareerPath);

  if (!careerPaths || !showNavigation || !selectedCareerPath) {
    return null;
  }

  return (
    <Menu opened={open} onChange={setOpen}>
      <Menu.Target>
        <Button variant="outline" className={styles.careerNav}>
          {selectedCareerPath.title}
          {open ? <IconChevronUp /> : <IconChevronDown />}
        </Button>
      </Menu.Target>
      <Menu.Dropdown w="30%" px="sm">
        {Object.entries(careerPaths)
          .sort(([_, a]) => (a.selected ? -1 : 1))
          .map(([careerId, { title, selected }]) => (
            <Menu.Item
              key={`select-${careerId}`}
              rightSection={
                <ActionIcon variant="transparent" onClick={() => {}}>
                  <IconHeart
                    size={30}
                    fill={selected ? 'red' : 'transparent'}
                    color={selected ? 'red' : 'navy'}
                  />
                </ActionIcon>
              }
            >
              <Text onClick={() => toggleCareerId(careerId)}>{title}</Text>
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
};
