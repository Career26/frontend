import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { Modal, Text } from '@mantine/core';
import classNames from 'classnames';

import { selectLoginModal, setLoginModal } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';
import { useAssociate } from '@shared/hooks/useAssociate';

import { SignUpBenefits } from './SignUpBenefits';

import '@aws-amplify/ui-react/styles.css';
import commonStyles from '@shared/styles/commonStyles.module.css';
import styles from './account.module.css';

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
  if (isMobile) {
    return (
      <div className={styles.signUpHeaderMobile}>
        <GetAccessTo />
      </div>
    );
  }
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
      <>
        <SignUpBenefits />
        <SignUpNow />
        <div className={styles.authenticatorFields}>
          <Authenticator.SignUp.FormFields />
        </div>
      </>
    );
  }

  return (
    <div className={classNames(commonStyles.row, styles.signUpContainer, styles.signUpHeader)}>
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
  const { isMobile } = useMobileStyles();
  const { route } = useAuthenticator((context) => [context.route]);
  const dispatch = useAppDispatch();
  const { open, initialState, associateProfileId } = useAppSelector(selectLoginModal);
  const { authenticated } = useAuthUser();

  const { associateProfile } = useAssociate();

  const onClose = () => {
    dispatch(setLoginModal({ open: false }));
  };

  useEffect(() => {
    if (!!associateProfileId && authenticated) {
      associateProfile(associateProfileId, onClose);
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
      className={classNames(styles.loginContainer, {
        [styles.signUpButtonSetRight]: !isMobile,
      })}
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
