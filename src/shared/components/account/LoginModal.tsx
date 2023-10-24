import { Authenticator, Radio, RadioGroupField, useAuthenticator } from '@aws-amplify/ui-react';
import { selectLoginModal, setLoginModal } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React, { useEffect } from 'react';
import { Modal } from '@mantine/core';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import { useLazyAssociateProfileQuery } from '@apis/profileApi';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAuthUser } from '@shared/hooks/useAuthUser';

import styles from './accountStyles.module.scss';

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
  const dispatch = useAppDispatch();
  const { open, initialState, associateProfileId } = useAppSelector(selectLoginModal);
  const { goToHomepage } = usePageNavigation();
  const [associateProfile] = useLazyAssociateProfileQuery();
  const { authenticated } = useAuthUser();

  const onClose = () => {
    dispatch(setLoginModal({ open: false }));
  };

  const handleConfirmSignUp = async ({ username, code }: { username: string; code: string }) => {
    try {
      await Auth.confirmSignUp(username, code);
      goToHomepage();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`signUp error: ${error}`);
    }
  };

  useEffect(() => {
    if (!!associateProfileId && authenticated) {
      associateProfile(associateProfileId);
    }
  }, [authenticated, associateProfileId]);

  return (
    <Modal
      onClose={onClose}
      opened={open}
      withCloseButton={false}
      centered
      radius={10}
      className={styles.loginContainer}
    >
      <Authenticator
        services={{ handleConfirmSignUp }}
        initialState={initialState}
        formFields={formFields}
        loginMechanisms={['email']}
        components={components}
        signUpAttributes={['email', 'name', 'gender']}
      />
    </Modal>
  );
};
