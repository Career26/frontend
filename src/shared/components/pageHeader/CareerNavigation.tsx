import { selectProfileId } from '@apis/profileApi';
import { ActionIcon, Combobox, InputBase, useCombobox } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { selectSelectedCareerPath } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import { IconHeart } from '@tabler/icons-react';
import React from 'react';
import { useCareerSelection } from '@shared/hooks/useCareerSelection';
import { useCareerTestStorage } from '@shared/hooks/useCareerTestStorage';
import commonStyles from '@shared/styles/commonStyles.module.scss';

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
      >
        {title}
        <ActionIcon
          aria-label={`favourite-icon-${careerIdentifier}`}
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
      </Combobox.Option>
    );
  });

  return (
    <Combobox store={combobox} onOptionSubmit={onSelect}>
      <Combobox.Target>
        <InputBase
          w="100%"
          component="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
        >
          {selectedCareerPath.title}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
