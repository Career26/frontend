import { Button, Group, Radio, Tabs, Text, TextInput, createStyles, rem } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import React, { useMemo, useState } from 'react';
import { UserDetails } from '@datatypes/profile';

const profileTabStyles = createStyles({
  buttons: {
    marginTop: rem(20),
    display: 'flex',
    alignItems: 'self-end',
  },
});

const DetailsTab = () => {
  const { user, loading, updateUserAttributes } = useAuthUser();
  const { classes } = profileTabStyles();

  const initialValues = {
    name: user.attributes?.name || '',
    gender: user.attributes?.gender || '',
    email: user.attributes?.email || '',
  };

  const form = useForm<UserDetails>({
    initialValues,
    validate: {
      name: (input) => !input && 'Name is required',
      email: isEmail('Must be a valid email'),
    },
  });

  const canUpdate = useMemo(() => {
    if (form.values.name === initialValues.name && form.values.gender === initialValues.gender) {
      return false;
    }
    return form.isValid();
  }, [form.values, initialValues]);
  return (
    <div>
      <TextInput label="Email" value={form.values.email} disabled />
      <TextInput {...form.getInputProps(form.values.name)} label="Name" />
      <Radio.Group name="Gender" label="Gender" value={form.values.gender}>
        <Group mt="xs">
          <Radio value="male" label="Male" />
          <Radio value="female" label="Female" />
          <Radio value="preferNotToSay" label="Prefer not to say" />
        </Group>
      </Radio.Group>
      <Group className={classes.buttons}>
        <Button
          variant="outline"
          onClick={() => updateUserAttributes(form.values)}
          disabled={!canUpdate || loading}
          loading={loading}
        >
          Update Profile
        </Button>
      </Group>
    </div>
  );
};

const AccountTab = () => {
  const { loading, deleteAccount } = useAuthUser();
  const [deleteText, setDeleteText] = useState('');
  const { classes } = profileTabStyles();
  return (
    <div>
      <Text>
        Delting your account will remove your saved careers, interview quesitons, and mentor
        network.
      </Text>
      <Group className={classes.buttons}>
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
