import { Button, Container, Group, Radio, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { setDeleteAccountModal } from '@slices/sessionSlice';
import { useAppDispatch } from '@state/store';
import React, { useEffect, useMemo } from 'react';
import { Auth } from 'aws-amplify';
import { notifications } from '@mantine/notifications';

type ProfileForm = {
  name?: string;
  gender?: string;
  email?: string;
};

export const ProfileTab = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuthUser();

  const initialValues = {
    name: user.attributes?.name,
    gender: user.attributes?.gender,
    email: user.attributes?.email,
  };

  const form = useForm<ProfileForm>({
    initialValues,
    validate: {
      name: (input) => !input && 'Name is required',
    },
  });

  const onClickUpdate = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { name: form.values.name, gender: form.values.gender });
      notifications.show({
        title: 'Updated profile',
        message: 'Successfully updated profile',
        color: 'green',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`update account error - ${error}`);
    }
  };

  const onClickDelete = () => {
    dispatch(setDeleteAccountModal({ open: true }));
  };

  const canUpdate = useMemo(() => {
    if (form.values.name === initialValues.name && form.values.gender === initialValues.gender) {
      return false;
    }
    return form.isValid();
  }, [form.values, initialValues]);

  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]);

  return (
    <div>
      <Container>
        <TextInput {...form.getInputProps('email')} label="Email" disabled />
        <TextInput {...form.getInputProps('name')} label="Name" />
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
      </Container>
      <Group>
        <Button onClick={onClickUpdate} disabled={!canUpdate}>
          Update Profile
        </Button>
        <Button onClick={onClickDelete} color="red">
          Delete Account
        </Button>
      </Group>
    </div>
  );
};
