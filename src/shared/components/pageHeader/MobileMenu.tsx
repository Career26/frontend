import React from 'react';
import { Menu, Burger } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useDisclosure } from '@mantine/hooks';
import { featureTiles } from '@shared/config/featureConstants';
import { useHistory } from 'react-router-dom';

interface MenuItem {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  divider?: boolean;
}

export const MobileMenu = ({
  signOut,
  authenticated,
  clickLogin,
}: {
  clickLogin: () => void;
  authenticated: boolean;
  signOut: () => void;
}) => {
  const [opened, { toggle }] = useDisclosure();
  const { clickCareersTest, goToSettings } = usePageNavigation();
  const history = useHistory();
  const menuItems: MenuItem[] = authenticated
    ? [
        ...featureTiles.map(({ title, disabled, link }, index) => ({
          label: title,
          onClick: () => !disabled && history.push(link),
          disabled,
          divider: index === featureTiles.length - 1,
        })),
        { label: 'Sign Out', onClick: signOut },
        { label: 'Account Settings', onClick: goToSettings },
      ]
    : [
        { label: 'Login', onClick: clickLogin },
        { label: 'Take the Test', onClick: clickCareersTest },
      ];

  return (
    <Menu width={300} data-testid="header-menu" opened={opened} onChange={toggle}>
      <Menu.Target>
        <Burger opened={opened} onClick={toggle} />
      </Menu.Target>
      <Menu.Dropdown>
        {menuItems.map(({ label, onClick, disabled, divider }) => (
          <>
            <Menu.Item key={`menu-item-${label}`} onClick={onClick} disabled={disabled}>
              {label}
            </Menu.Item>
            {divider && <Menu.Divider />}
          </>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
