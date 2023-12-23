import React from 'react';
import { Menu, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface BurgerMenuProps {
  testId?: string;
  menu: React.ReactNode;
}

export const BurgerMenu = ({ menu, testId }: BurgerMenuProps) => {
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
