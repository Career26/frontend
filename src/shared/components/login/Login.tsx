import { Authenticator, Radio, RadioGroupField, useAuthenticator } from '@aws-amplify/ui-react';
import { selectLoginModal, setLoginModal } from '@slices/userSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React from 'react';
import { Modal, createStyles } from '@mantine/core';
import '@aws-amplify/ui-react/styles.css';

const loginStlyes = createStyles({
  container: {
    '.mantine-Modal-body': {
      padding: 0,
    },
    '[data-amplify-authenticator] [data-amplify-container]': {
      width: '100%',
    },
  },
});

const FormFields = () => {
  const { validationErrors } = useAuthenticator();
  return (
    <>
      <Authenticator.SignUp.FormFields />
      <RadioGroupField
        label="Gender"
        name="gender"
        errorMessage={validationErrors.gender as string}
        hasError={!!validationErrors.gender}
      >
        <Radio value="male">Male</Radio>
        <Radio value="female">Female</Radio>
        <Radio value="preferNotToSay">Prefer not to say</Radio>
      </RadioGroupField>
    </>
  );
};

const formFields = {
  signUp: {
    given_name: {
      order: 1,
      label: 'First Name',
      isRequired: true,
      placeholder: 'Enter your First Name',
    },
    family_name: {
      order: 2,
      label: 'Last Name',
      isRequired: true,
      placeholder: 'Enter your Last Name',
    },
    email: {
      order: 3,
      isRequired: true,
    },
    password: {
      order: 4,
      isRequired: true,
    },
    confirm_password: {
      order: 5,
      isRequired: true,
    },
  },
};

const components = {
  SignUp: {
    FormFields,
  },
};

export const Login = () => {
  const { classes } = loginStlyes();
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(selectLoginModal);

  const onClose = () => {
    dispatch(setLoginModal({ open: false }));
  };

  return (
    <Modal
      onClose={onClose}
      opened={open}
      className={classes.container}
      withCloseButton={false}
      centered
      radius={10}
    >
      <Authenticator
        className={classes.container}
        formFields={formFields}
        loginMechanisms={['email']}
        components={components}
        signUpAttributes={['email', 'family_name', 'given_name', 'gender']}
      />
    </Modal>
  );
};