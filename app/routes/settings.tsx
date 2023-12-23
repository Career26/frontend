import { Card, Container, NavLink } from '@mantine/core';
import { useState } from 'react';

import { ProfileTab } from '@settings/ProfileTab';
import { UserInfoTab } from '@settings/UserInfoTab';
import { Shell } from '@shared/components/shell/Shell';

const profileLinks = [
  { label: 'Profile', Component: ProfileTab },
  { label: 'User Info', Component: UserInfoTab },
];

const Index = () => {
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
        <Card radius="md" p="md" withBorder>
          <Component />
        </Card>
      </Container>
    </Shell>
  );
};

export default Index;
