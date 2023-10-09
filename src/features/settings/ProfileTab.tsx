import { Button, Group, Radio, Text, TextInput, createStyles, rem } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import React, { useMemo, useState } from 'react';
import { CareerCard } from '@shared/components/cards/CareerCard';
import { UserDetails } from '@datatypes/profile';

const profileTabStyles = createStyles((theme) => ({
  container: {
    gap: rem(20),
    display: 'flex',
    flexDirection: 'column',
  },
  buttons: {
    marginTop: rem(20),
    display: 'flex',
    alignItems: 'self-end',
  },
  deleteAccount: {
    '.mantine-Card-cardSection': {
      backgroundColor: theme.colors.red[3],
      '.mantine-Text-root': {
        color: 'white',
      },
    },
  },
}));

export const ProfileTab = () => {
  const [deleteText, setDeleteText] = useState('');
  const { user, loading, updateUserAttributes, deleteAccount } = useAuthUser();
  const { classes } = profileTabStyles();

  const initialValues = {
    name: user.attributes?.name,
    gender: user.attributes?.gender,
    email: user.attributes?.email,
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
    <div className={classes.container}>
      <CareerCard
        title="User Details"
        content={
          <>
            <TextInput {...form.getInputProps('email')} label="Email" disabled />
            <TextInput {...form.getInputProps('name')} label="Name" disabled />
            <Radio.Group
              name="Gender"
              label="Gender"
              value={form.values.gender}
              onChange={(value) => form.setFieldValue('gender', value)}
            >
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
          </>
        }
      />
      <div className={classes.deleteAccount}>
        <CareerCard
          title="Delete Account"
          content={
            <>
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
            </>
          }
        />
      </div>
    </div>
  );
};
