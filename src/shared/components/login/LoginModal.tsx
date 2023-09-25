import React, { useState } from 'react';
import { Modal, Button, Group, TextInput, Text, PasswordInput, Checkbox } from '@mantine/core';
import { UseFormReturnType, isEmail, matchesField, useForm } from '@mantine/form';
import { IconAt, IconLock, TablerIconsProps } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@state/store';
import { selectLoginModal, setLoginModal } from '@slices/userSlice';
import { Auth } from 'aws-amplify';

import { loginStyles } from './loginStyles';

type LoginFormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  agreement: boolean;
};

const InputField = ({
  form,
  field,
  label,
  Icon,
}: {
  form: UseFormReturnType<LoginFormValues>;
  field: keyof LoginFormValues;
  label: string;
  Icon?: (props: TablerIconsProps) => JSX.Element;
}) => {
  const { classes } = loginStyles();
  return (
    <TextInput
      label={label}
      withAsterisk
      icon={Icon && <Icon size={20} />}
      className={classes.inputField}
      {...form.getInputProps(field)}
    />
  );
};

const PasswordField = ({
  form,
  label,
  field,
}: {
  form: UseFormReturnType<LoginFormValues>;
  label: string;
  field: string;
}) => {
  const { classes } = loginStyles();
  return (
    <PasswordInput
      placeholder={label}
      label={label}
      withAsterisk
      icon={<IconLock size={20} />}
      className={classes.inputField}
      {...form.getInputProps(field)}
    />
  );
};

export const LoginModal = () => {
  const { classes } = loginStyles();
  const [hasAccount, setHasAccount] = useState(false);
  const { open, onComplete } = useAppSelector(selectLoginModal);
  const dispatch = useAppDispatch();

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      agreement: false,
    },
    validate: {
      email: isEmail('Invalid email'),
      password: (value) => !value && 'Password is required',
      firstName: (value) => !value && 'First name is required',
      lastName: (value) => !value && 'Last name is required',
      confirmPassword: matchesField('password', 'Passwords are not the same'),
      agreement: (value) => !value && 'You must agree to the terms and conditions',
    },
  });

  const onClose = () => {
    form.reset();
    dispatch(setLoginModal({ open: false }));
  };

  const checkIsValid = () => {
    form.validate();
    if (hasAccount) {
      return !['email', 'password'].some((field) => !form.isValid(field));
    }
    return form.isValid();
  };

  const onSubmit = async () => {
    const isValid = checkIsValid();
    if (!isValid) {
      return;
    }
    try {
      if (hasAccount) {
        await Auth.signIn({ username: form.values.email, password: form.values.password });
      } else {
        await Auth.signUp({
          username: form.values.email,
          password: form.values.password,
          attributes: {
            email: form.values.email,
            name: form.values.firstName,
            family_name: form.values.lastName,
            gender: 'male',
          },
        });
      }
      onClose();
      if (onComplete) {
        onComplete();
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={hasAccount ? 'Sign In' : 'Register Account'}
      centered
      className={classes.title}
    >
      {!hasAccount && (
        <div className={classes.name}>
          <InputField label="First Name" field="firstName" form={form} />
          <InputField label="Last Name" field="lastName" form={form} />
        </div>
      )}
      <InputField label="Email" Icon={IconAt} field="email" form={form} />
      <PasswordField form={form} label="Password" field="password" />
      {!hasAccount && (
        <>
          <PasswordField form={form} label="Confirm Password" field="confirmPassword" />
          <Checkbox
            label="I agree to the terms and conditions"
            className={classes.footer}
            {...form.getInputProps('agreement')}
          />
        </>
      )}
      <Group className={classes.footer}>
        <Text
          onClick={() => setHasAccount(!hasAccount)}
          c="dimmed"
          className={classes.accountSwitch}
        >
          {hasAccount ? "Don't have an account? Register" : 'Already have an account? Login'}
        </Text>
        <Button onClick={onSubmit}>{hasAccount ? 'Login' : 'Register'}</Button>
      </Group>
    </Modal>
  );
};
