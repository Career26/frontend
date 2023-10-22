import { Container, NavLink } from '@mantine/core';
import { Shell } from '@shared/components/shell/Shell';
import React, { useState } from 'react';

import { ProfileTab } from './ProfileTab';
import { UserInfoTab } from './UserInfoTab';

const profileLinks = [
  { label: 'Profile', Component: ProfileTab },
  { label: 'User Info', Component: UserInfoTab },
];

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { Component } = profileLinks[activeTab];

  return (
    <Shell
      navbar={
        <div>
          {profileLinks.map(({ label }, index) => (
            <NavLink
              key={`link-${label}`}
              label={label}
              active={activeTab === index}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>
      }
    >
      <Container py="md">
        <Component />
      </Container>
    </Shell>
  );
};
