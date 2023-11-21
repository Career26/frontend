import React from 'react';
import { Menu, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const BurgerMenu = ({ menu, testId }: { testId?: string; menu: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Menu width={300} data-testid={testId} opened={opened} onChange={toggle}>
      <Menu.Target>
        <Burger opened={opened} onClick={toggle} />
      </Menu.Target>
      <Menu.Dropdown>{menu}</Menu.Dropdown>
    </Menu>
  );
};
