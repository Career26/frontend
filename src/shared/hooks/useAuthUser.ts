import { useAuthenticator } from '@aws-amplify/ui-react';
import { selectLoginModal, setLoginModal } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import { useEffect } from 'react';

export const useAuthUser = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(selectLoginModal);
  const { signOut, user, authStatus } = useAuthenticator((context) => [context.route]);
  const authenticated = authStatus === 'authenticated';
  const unauthenticated = authStatus === 'unauthenticated';

  useEffect(() => {
    if (authenticated && open) {
      dispatch(setLoginModal({ open: false }));
    }
  }, [authenticated, signOut]);

  return {
    unauthenticated,
    authenticated,
    user,
    signOut,
  };
};
