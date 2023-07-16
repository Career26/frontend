import { Button, Text, Group, Modal, TextInput, Paper } from '@mantine/core';
import React from 'react';
import { useForm } from '@mantine/form';
import { urls } from '@shared/config/urlConstants';
import { useHistory } from 'react-router-dom';

export const LandingPage = () => {
  const history = useHistory();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const clickSignIn = () => {
    history.push(urls.home);
  };

  return (
    <Modal opened onClose={() => {}} withCloseButton={false} size="auto">
      <Paper title="Sign In">
        <TextInput label="Email" {...form.getInputProps('email')} />
        <TextInput label="Password" {...form.getInputProps('password')} />
        <Button onClick={clickSignIn}>Sign In</Button>
        <Group>
          <Text c="dimmed">Don&apos;t have an accont?</Text>
          <Text fw={700}>
            <a href={urls.careerTest}>Take our FREE Career Test</a>
          </Text>
        </Group>
      </Paper>
    </Modal>
  );
};
