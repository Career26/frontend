import { Button, Group, Tabs, Text, TextInput } from '@mantine/core';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import React, { useState } from 'react';
import { IconExclamationCircle } from '@tabler/icons-react';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import classNames from 'classnames';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';

import styles from './settingsStyles.module.scss';

const DetailsTab = () => {
  const { user } = useAuthUser();
  return (
    <div>
      <TextInput label="Email" value={user?.attributes?.email} disabled />
      <TextInput value={user?.attributes?.name} label="Name" disabled />
    </div>
  );
};

const AccountTab = () => {
  const { isMobile } = useMobileStyles();
  const { loading, deleteAccount } = useAuthUser();
  const [deleteText, setDeleteText] = useState('');
  return (
    <div>
      <div
        className={classNames(commonStyles.row, {
          [styles.accountTabMobile]: isMobile,
          [styles.accountTab]: !isMobile,
        })}
      >
        <IconExclamationCircle color="red" size={40} />
        <Text fw="bold">
          Deleting your account will remove your saved careers, interview quesitons, and mentor
          network.
        </Text>
      </div>
      <Group py="lg" display="flex" justify={isMobile ? 'center' : 'flex-start'} align="flex-end">
        <TextInput
          value={deleteText}
          label="Type DELETE to confirm"
          onChange={({ target: { value } }) => setDeleteText(value)}
        />
        <Button
          color="red"
          disabled={deleteText !== 'DELETE' || loading}
          variant="outline"
          onClick={deleteAccount}
          loading={loading}
        >
          Delete Profile
        </Button>
      </Group>
    </div>
  );
};

const tabs = [
  { label: 'Details', Component: DetailsTab },
  { label: 'Account', Component: AccountTab },
];

export const ProfileTab = () => (
  <Tabs defaultValue={tabs[0].label}>
    <Tabs.List>
      {tabs.map(({ label }) => (
        <Tabs.Tab key={`tab-${label}`} value={label}>
          {label}
        </Tabs.Tab>
      ))}
    </Tabs.List>
    {tabs.map(({ label, Component }) => (
      <Tabs.Panel key={`panel-${label}`} value={label} pt="md">
        <Component />
      </Tabs.Panel>
    ))}
  </Tabs>
);
