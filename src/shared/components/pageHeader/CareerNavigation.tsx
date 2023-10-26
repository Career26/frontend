import { selectProfileId } from '@apis/profileApi';
import { ActionIcon, Button, Menu, Text } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { selectSelectedCareerPath } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import { IconChevronDown, IconChevronUp, IconHeart } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useCareerSelection } from '@careerTest/hooks/useCareerSelection';
import { useCareerTestStorage } from '@careerTest/hooks/useCareerTestStorage';

import styles from './headerStyles.module.scss';

export const CareerNavigation = () => {
  const [open, setOpen] = useState(false);
  const { toggleCareerId, showNavigation } = usePageNavigation();
  const selectedCareerPath = useAppSelector(selectSelectedCareerPath);
  const profileIdentifier = useAppSelector(selectProfileId);
  const {
    careerTestStorage: { careerPaths },
  } = useCareerTestStorage();
  const { loadingCareers, selectedCareers, toggleSelectedCareer } = useCareerSelection();

  if (!careerPaths || !showNavigation || !selectedCareerPath) {
    return null;
  }

  return (
    <Menu opened={open} onClose={() => setOpen(false)}>
      <Menu.Target>
        <Button variant="outline" className={styles.careerNav} onClick={() => setOpen(!open)}>
          {selectedCareerPath.title}
          {open ? <IconChevronUp /> : <IconChevronDown />}
        </Button>
      </Menu.Target>
      <Menu.Dropdown w="30%" px="sm">
        {Object.entries(careerPaths).map(([careerIdentifier, { title }]) => {
          const selected = selectedCareers[careerIdentifier];
          return (
            <Menu.Item
              key={`select-${careerIdentifier}`}
              rightSection={
                <ActionIcon
                  loading={loadingCareers[careerIdentifier]}
                  variant="transparent"
                  onClick={() =>
                    toggleSelectedCareer({
                      selected: !selected,
                      careerIdentifier,
                      profileIdentifier,
                    })
                  }
                >
                  <IconHeart
                    size={30}
                    fill={selected ? 'red' : 'transparent'}
                    color={selected ? 'red' : 'navy'}
                  />
                </ActionIcon>
              }
            >
              <Text
                onClick={() => {
                  toggleCareerId(careerIdentifier);
                  setOpen(false);
                }}
              >
                {title}
              </Text>
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
