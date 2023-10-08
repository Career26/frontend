import { Button, Navbar } from '@mantine/core';
import { Shell } from '@shared/components/shell/Shell';
import { featureStyles } from '@shared/styles/featureStyles';
import { navStyles } from '@shared/styles/navStyles';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { useAppSelector } from '@state/store';
import { selectProfile } from '@apis/profileApi';

import { ProfileTab } from './ProfileTab';
import { UserInfoTab } from './UserInfoTab';

const profileLinks = [
  { label: 'Profile', Component: ProfileTab },
  { label: 'User Info', Component: UserInfoTab },
];

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { classes: featureClasses } = featureStyles();
  const { classes: navClasses } = navStyles();
  const { Component } = profileLinks[activeTab];
  const profile = useAppSelector(selectProfile);
  const {
    user: { attributes },
  } = useAuthUser();

  return (
    <div className={featureClasses.wrapper}>
      <Shell
        navbar={
          <Navbar height={400} p="xs" className={navClasses.navBar}>
            <Navbar.Section grow mt="md" className={navClasses.navLink}>
              {profileLinks.map(({ label }, index) => (
                <Button
                  onClick={() => setActiveTab(index)}
                  key={`link-${label}`}
                  className={classNames(navClasses.navButton, navClasses.linkAction, {
                    [navClasses.active]: activeTab === index,
                  })}
                >
                  {label}
                </Button>
              ))}
            </Navbar.Section>
          </Navbar>
        }
      >
        <div className={featureClasses.content}>
          <Component />
        </div>
      </Shell>
    </div>
  );
};
