import { Authenticator, Radio, RadioGroupField, useAuthenticator } from '@aws-amplify/ui-react';
import { selectLoginModal } from '@slices/userSlice';
import { useAppSelector } from '@state/store';
import React from 'react';
import '@aws-amplify/ui-react/styles.css';

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

export const Login = () => {
  const { open } = useAppSelector(selectLoginModal);
  if (!open) {
    return false;
  }

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

  return (
    <Authenticator
      formFields={formFields}
      loginMechanisms={['email']}
      variation="modal"
      components={components}
      signUpAttributes={['email', 'family_name', 'given_name', 'gender']}
    />
  );
};
