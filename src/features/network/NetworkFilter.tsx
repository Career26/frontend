import { Button, Checkbox, NavLink } from '@mantine/core';
import classNames from 'classnames';
import { useState } from 'react';

import { useMobileStyles } from '@shared/hooks/useMobileStyles';

import commonStlyes from '@shared/styles/commonStyles.module.css';

const filters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => `Filter ${id}`);

export const NetworkFilter = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { isMobile } = useMobileStyles();

  const onClick = (filter: string) => {
    const isChecked = activeFilters.includes(filter);
    if (isChecked) {
      setActiveFilters((prev) => prev.filter((item) => item !== filter));
    } else {
      setActiveFilters((prev) => [...prev, filter]);
    }
  };

  return filters.map((filter) => (
    <NavLink
      role="button"
      className={classNames({ [commonStlyes.mobileNavbar]: isMobile })}
      key={`filter-${filter}`}
      onClick={() => onClick(filter)}
      label={
        <Button variant="transparent">
          <Checkbox checked={activeFilters.includes(filter)} px="sm" />
          {filter}
        </Button>
      }
    />
  ));
};
