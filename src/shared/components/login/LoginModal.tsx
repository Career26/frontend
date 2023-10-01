import { Authenticator, Radio, RadioGroupField, useAuthenticator } from '@aws-amplify/ui-react';
import { selectLoginModal, setLoginModal } from '@slices/userSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React from 'react';
import { Modal, createStyles } from '@mantine/core';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import { useLazyAssociateProfileQuery } from '@apis/profileApi';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';

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
    name: {
      order: 1,
      label: 'Name',
      isRequired: true,
      placeholder: 'Enter your Name',
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

export const LoginModal = () => {
  const { classes } = loginStlyes();
  const dispatch = useAppDispatch();
  const { open, initialState, associateProfileId } = useAppSelector(selectLoginModal);
  const [associateProfile] = useLazyAssociateProfileQuery();
  const { goToHomepage } = usePageNavigation();

  const onClose = () => {
    dispatch(setLoginModal({ open: false }));
  };

  const handleConfirmSignUp = async ({ username, code }: { username: string; code: string }) => {
    try {
      await Auth.confirmSignUp(username, code);
      if (associateProfileId) {
        await associateProfile(associateProfileId);
      }
      goToHomepage();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`signUp error: ${error}`);
    }
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
        services={{ handleConfirmSignUp }}
        initialState={initialState}
        className={classes.container}
        formFields={formFields}
        loginMechanisms={['email']}
        components={components}
        signUpAttributes={['email', 'name', 'gender']}
      />
    </Modal>
  );
};
