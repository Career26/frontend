import { useAuthenticator } from '@aws-amplify/ui-react';
import { resetSession, selectLoginModal, setLoginModal } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { UserDetails } from '@datatypes/profile';
import { useCareerTestStorage } from '@shared/hooks/useCareerTestStorage';

import { usePageNavigation } from './usePageNavigation';

export const useAuthUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { goToHomepage } = usePageNavigation();
  const { open } = useAppSelector(selectLoginModal);
  const { resetValues } = useCareerTestStorage();
  const { signOut, user, authStatus } = useAuthenticator((context) => [context.route]);
  const authenticated = authStatus === 'authenticated';
  const unauthenticated = authStatus === 'unauthenticated';

  useEffect(() => {
    if (authenticated && open) {
      dispatch(setLoginModal({ open: false }));
    }
  }, [authenticated, signOut]);

  const updateUserAttributes = async (attributes: UserDetails) => {
    setLoading(true);
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(authUser, attributes);
      notifications.show({
        title: 'Updated Account',
        message: 'Successfully updated profile details',
        color: 'green',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`update account error - ${error}`);
      notifications.show({
        title: 'Update Failed',
        message: 'Could not update profile details',
        color: 'red',
      });
    }
    setLoading(false);
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      await Auth.deleteUser();
      notifications.show({
        title: 'Deleted Account',
        message: 'Successfully deleted profile',
        color: 'green',
      });
      resetValues();
      goToHomepage();
      dispatch(resetSession());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`delete account error - ${error}`);
      notifications.show({
        title: 'Delete Failed',
        message: 'Could not delete profile',
        color: 'red',
      });
    }
    setLoading(false);
  };

  return {
    loading,
    unauthenticated,
    authenticated,
    user,
    signOut,
    updateUserAttributes,
    deleteAccount,
  };
};
