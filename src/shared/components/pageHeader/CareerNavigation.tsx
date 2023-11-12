import { selectProfileId } from '@apis/profileApi';
import { ActionIcon, Combobox, InputBase, Text, useCombobox } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { selectSelectedCareerPath } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import { IconHeart } from '@tabler/icons-react';
import React from 'react';
import { useCareerSelection } from '@shared/hooks/useCareerSelection';
import { useCareerTestStorage } from '@shared/hooks/useCareerTestStorage';
import commonStyles from '@shared/styles/commonStyles.module.scss';

import styles from './headerStyles.module.scss';

export const CareerNavigation = () => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
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

  const onSelect = (careerIdentifier: string) => {
    toggleCareerId(careerIdentifier);
    combobox.closeDropdown();
  };

  const options = Object.entries(careerPaths).map(([careerIdentifier, { title }]) => {
    const selected = selectedCareers[careerIdentifier];
    return (
      <Combobox.Option
        value={careerIdentifier}
        key={`household-${careerIdentifier}`}
        className={commonStyles.spaceBetweenRow}
        w="100%"
        id="dave"
        onClick={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (!e.target.textContent) {
            return;
          }
          onSelect(careerIdentifier);
        }}
      >
        <Text>{title}</Text>
        <ActionIcon
          aria-label={`favourite-icon-${careerIdentifier}`}
          loading={loadingCareers[careerIdentifier]}
          variant="transparent"
          id="select"
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
      </Combobox.Option>
    );
  });

  return (
    <Combobox store={combobox}>
      <Combobox.Target>
        <InputBase
          w="30%"
          component="button"
          pointer
          rightSection={
            <ActionIcon
              onClick={() => combobox.toggleDropdown()}
              color="none"
              className={styles.chevron}
            >
              <Combobox.Chevron color="none" />
            </ActionIcon>
          }
          onClick={() => combobox.toggleDropdown()}
        >
          {selectedCareerPath?.title}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
