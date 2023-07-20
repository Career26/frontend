import React from 'react';
import { useForm } from '@mantine/form';
import { urls } from '@shared/config/urlConstants';
import { useHistory } from 'react-router-dom';
import { Link, Stack, TextField } from '@mui/material';
import { ConfirmationDialog } from '@shared/components/dialogs/ConfirmationDialog';

export const LandingPage = () => {
  const history = useHistory();

  const clickSignIn = () => {
    history.push(urls.home);
  };

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <ConfirmationDialog open title="Sign In" onConfirm={clickSignIn} ignoreCancelButton>
      <Stack>
        <>
          <TextField
            label="email"
            value={form.values.email}
            onChange={({ target: { value } }) => form.setFieldValue('email', value)}
          />
          <TextField
            label="password"
            value={form.values.password}
            onChange={({ target: { value } }) => form.setFieldValue('password', value)}
          />
        </>
        <>
          <div>Don&apos;t have an account?</div>
          <Link href={urls.careersTest}>Take our FREE careers test now!</Link>
        </>
      </Stack>
    </ConfirmationDialog>
  );
};
