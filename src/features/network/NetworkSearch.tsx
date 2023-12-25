import { useMemo } from 'react';
import { Autocomplete, ComboboxItem, OptionsFilter } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { mentorList } from '@mocks/mentorMocks';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
  });
};

export const NetworkSearch = () => {
  const data = useMemo(
    () =>
      mentorList.map((item) => ({ label: item.name, value: item.id, description: item.industry })),
    [mentorList],
  );

  return (
    <Autocomplete
      py="md"
      w="70%"
      data={data}
      rightSectionPointerEvents="none"
      rightSection={<IconSearch />}
      placeholder="Find a mentor"
      filter={optionsFilter}
    />
  );
};
