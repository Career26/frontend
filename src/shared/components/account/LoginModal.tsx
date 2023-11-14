import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { selectLoginModal, setLoginModal } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React, { useEffect } from 'react';
import { Modal, Text } from '@mantine/core';
import { useLazyAssociateProfileQuery } from '@apis/profileApi';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { notifications } from '@mantine/notifications';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import classNames from 'classnames';
import '@aws-amplify/ui-react/styles.css';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';

import { SignUpBenefits } from './SignUpBenefits';
import styles from './accountStyles.module.scss';

const GetAccessTo = () => (
  <Text fw="bold" size="2.5rem" py="sm">
    Get access to
  </Text>
);

const SignUpNow = () => (
  <Text fw="bold" size="2.5rem" c="navy" py="md">
    Sign up now
  </Text>
);

const SignUpHeader = () => {
  const { isMobile } = useMobileStyles();
  return (
    <div className={classNames(commonStyles.row, styles.signUpHeader)}>
      {isMobile ? (
        <GetAccessTo />
      ) : (
        <>
          <GetAccessTo />
          <SignUpNow />
        </>
      )}
    </div>
  );
};

const SignUpForm = () => {
  const { isMobile } = useMobileStyles();
  if (isMobile) {
    return (
      <div>
        <SignUpBenefits />
        <div>
          <div className={styles.signUpHeader}>
            <SignUpNow />
          </div>
          <div className={styles.authenticatorFields}>
            <Authenticator.SignUp.FormFields />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames({ [commonStyles.row]: !isMobile }, styles.signUpContainer)}>
      <SignUpBenefits />
      <div>
        <Authenticator.SignUp.Header />
        <div className={styles.authenticatorFields}>
          <Authenticator.SignUp.FormFields />
        </div>
      </div>
    </div>
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
    FormFields: SignUpForm,
    Header: SignUpHeader,
  },
};

export const LoginModal = () => {
  const { route } = useAuthenticator((context) => [context.route]);
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
      size={route === 'signUp' ? '100%' : undefined}
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
