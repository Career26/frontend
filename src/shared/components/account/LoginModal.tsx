import { Authenticator, SelectField, useAuthenticator } from '@aws-amplify/ui-react';
import { selectLoginModal, setLoginModal } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React, { useEffect } from 'react';
import { Modal } from '@mantine/core';
import { useLazyAssociateProfileQuery } from '@apis/profileApi';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { notifications } from '@mantine/notifications';
import { Gender } from '@datatypes/profile';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import classNames from 'classnames';
import '@aws-amplify/ui-react/styles.css';

import { SignUpBenefits } from './SignUpBenefits';
import styles from './accountStyles.module.scss';

const SignUpForm = () => {
  const { validationErrors } = useAuthenticator();
  return (
    <div className={classNames(commonStyles.row, styles.signUpContainer)}>
      <SignUpBenefits />
      <div>
        <Authenticator.SignUp.FormFields />
        <SelectField
          label="Gender"
          name="gender"
          errorMessage={validationErrors.gender as string}
          hasError={!!validationErrors.gender}
        >
          {Object.entries(Gender).map(([label, value]) => (
            <option value={value} key={`signup-gender-${value}`}>
              {label}
            </option>
          ))}
        </SelectField>
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
      size={route === 'signUp' ? 'calc(100vw - 3rem)' : undefined}
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
