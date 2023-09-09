import React, { useState } from 'react';
import {
  Modal,
  Button,
  Group,
  Container,
  TextInput,
  Text,
  PasswordInput,
  Checkbox,
} from '@mantine/core';
import { UseFormReturnType, isEmail, matchesField, useForm } from '@mantine/form';
import { IconAt, IconLock, TablerIconsProps } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@state/store';
import { selectLoginModal, setLoginModal } from '@slices/userSlice';

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
  const onClose = () => dispatch(setLoginModal({ open: false }));

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

  const checkIsValid = () => {
    form.validate();
    if (hasAccount) {
      return !['email. password'].some((field) => !form.isValid(field));
    }
    return form.isValid();
  };

  const onSubmit = () => {
    const isValid = checkIsValid();
    if (!isValid) {
      return;
    }
    // handle log in endpoint
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Modal opened={open} onClose={onClose} title="Sign Up" centered className={classes.title}>
      <Container>
        {hasAccount ? (
          <>
            <InputField label="Email" Icon={IconAt} field="email" form={form} />
            <PasswordField form={form} label="Password" field="field" />
          </>
        ) : (
          <>
            <div className={classes.name}>
              <InputField label="First Name" field="firstName" form={form} />
              <InputField label="Last Name" field="lastName" form={form} />
            </div>
            <InputField label="Email" Icon={IconAt} field="email" form={form} />
            <PasswordField form={form} label="Password" field="field" />
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
      </Container>
    </Modal>
  );
};
