import { useState } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';

interface CreateableSelectProps {
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
  label: string;
  className?: string;
  errorMessage?: string;
}

export const CreateableSelect = ({
  value,
  options,
  onChange,
  placeholder,
  label,
  errorMessage,
  className,
}: CreateableSelectProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [data, setData] = useState(options);
  const [search, setSearch] = useState(value || '');

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

  const onOptionSubmit = (val: string) => {
    if (val === '$add') {
      setData((current) => [...current, search]);
      onChange(search);
    } else {
      setSearch(val);
      onChange(val);
    }
    combobox.closeDropdown();
  };

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={onOptionSubmit}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - className works but classNames doesnt
      className={className}
    >
      <Combobox.Target>
        <InputBase
          error={errorMessage}
          withAsterisk
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || '');
          }}
          label={label}
          placeholder={placeholder}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
          {filteredOptions.map((item) => (
            <Combobox.Option value={item} key={item}>
              {item}
            </Combobox.Option>
          ))}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$add">{`Add "${search}"`}</Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
