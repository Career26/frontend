import { CareerFormProps } from '@careerTest/careerTestTypes';
import { Household } from '@datatypes/profile';
import { Combobox, InputBase, Tooltip, useCombobox } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import React from 'react';
import commonStyles from '@shared/styles/commonStyles.module.scss';

const getHouseholdTooltip = (value: Household) => {
  switch (value) {
    case Household['Clerical and intermediate occupations']:
      return 'e.g. secretary, personal assistant, call centre agent, clerical worker, nursery nurse.';
    case Household['Long-term unemployed']:
      return "e.g. claimed Jobseeker's Allowance or earlier unemployment benefit for more than a year.";
    case Household['Modern professional & traditional professional occupations']:
      return 'e.g. teacher, nurse, physiotherapist, social worker, musician, police officer, software designer, accountant, solicitor, medical practitioner, scientist, civil/mechanical engineer.';
    case Household['Prefer not to say']:
      return '';
    case Household['Routine, semi-routine manual and service occupations']:
      return 'e.g. postal worker, machine operative, security guard, caretaker, farm worker, catering assistant, sales assistant, HGV driver, cleaner, porter, packer, labourer, waiter/waitress, bar staff.';
    case Household['Senior, middle or junior managers or administrators']:
      return 'e.g. finance manager, chief executive, large business owner, office manager, retail manager, bank manager, restaurant manager, warehouse manager.';
    case Household['Small business owners']:
      return 'who employ less than 25 people, such as corner shop owners, small plumbing companies, retail shop owner, single restaurant or cafe owner, taxi owner, garage owner.';
    case Household['Technical and craft occupations']:
      return 'e.g. motor mechanic, plumber, printer, electrician, gardener, train driver.';
    default:
      return 'e.g. retired, this question does not apply to me or do not know.';
  }
};

export const SelectHousehold = ({ form }: { form: CareerFormProps }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const selection = Object.keys(Household).find(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (item) => Household[item] === form.values.diversity?.household,
  );

  const onSelect = (value: string) => {
    form.setFieldValue('diversity.household', value);
    combobox.closeDropdown();
  };

  const options = Object.entries(Household).map(([label, value]) => (
    <Combobox.Option
      value={value}
      key={`household-${value}`}
      className={commonStyles.spaceBetweenRow}
      w="100%"
    >
      {label}
      {value !== Household['Prefer not to say'] && (
        <Tooltip label={getHouseholdTooltip(value)}>
          <IconInfoCircle />
        </Tooltip>
      )}
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={onSelect}>
      <Combobox.Target>
        <InputBase
          label="What was the occupation of your main household earner when you were about age 14?"
          w="100%"
          component="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
        >
          {selection}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
