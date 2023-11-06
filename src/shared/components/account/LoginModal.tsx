import { Authenticator, Radio, RadioGroupField, useAuthenticator } from '@aws-amplify/ui-react';
import { selectLoginModal, setLoginModal } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React, { useEffect } from 'react';
import { Modal } from '@mantine/core';
import { useLazyAssociateProfileQuery } from '@apis/profileApi';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { notifications } from '@mantine/notifications';
import '@aws-amplify/ui-react/styles.css';

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
  const [associateProfile] = useLazyAssociateProfileQuery();
  const { authenticated } = useAuthUser();
  const { goToHomepage } = usePageNavigation();

  const onClose = () => {
    dispatch(setLoginModal({ open: false }));
  };

  const handleAssociate = async (profileId: string) => {
    try {
      await associateProfile(profileId);
      notifications.show({
        title: 'Created Account',
        message: 'Successfully created account',
        color: 'green',
      });
      onClose();
      goToHomepage();
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`associate account error - ${error}`);
    }
  };

  useEffect(() => {
    if (!!associateProfileId && authenticated) {
      handleAssociate(associateProfileId);
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
        initialState={initialState}
        formFields={formFields}
        loginMechanisms={['email']}
        components={components}
        signUpAttributes={['email', 'name', 'gender']}
      />
    </Modal>
  );
};
