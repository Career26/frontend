import { AppShell, Button, Container } from '@mantine/core';
import { Shell } from '@shared/components/shell/Shell';
import featureStyles from '@shared/styles/featureStyles.module.scss';
import navStyles from '@shared/styles/navStyles.module.scss';
import classNames from 'classnames';
import React, { useState } from 'react';

import { ProfileTab } from './ProfileTab';
import { UserInfoTab } from './UserInfoTab';
import styles from './settingsStyles.module.scss';

const profileLinks = [
  { label: 'Profile', Component: ProfileTab },
  { label: 'User Info', Component: UserInfoTab },
];

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { Component } = profileLinks[activeTab];

  return (
    <div className={featureStyles.wrapper}>
      <Shell
        navbar={
          <AppShell.Navbar h={400} p="xs" className={navStyles.navBar}>
            <AppShell.Section grow mt="md" className={navStyles.navLink}>
              {profileLinks.map(({ label }, index) => (
                <Button
                  onClick={() => setActiveTab(index)}
                  key={`link-${label}`}
                  className={classNames(navStyles.navButton, navStyles.linkAction, {
                    [navStyles.active]: activeTab === index,
                  })}
                >
                  {label}
                </Button>
              ))}
            </AppShell.Section>
          </AppShell.Navbar>
        }
      >
        <div className={featureStyles.content}>
          <Container className={styles.container}>
            <Component />
          </Container>
        </div>
      </Shell>
    </div>
  );
};
