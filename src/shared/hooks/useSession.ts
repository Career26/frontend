import { useAuthenticator } from '@aws-amplify/ui-react';
import { selectLoginModal, setLoginModal } from '@slices/userSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import { useEffect } from 'react';

export const useSession = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(selectLoginModal);
  const { signOut, user, authStatus } = useAuthenticator((context) => [context.route]);
  const authenticated = authStatus === 'authenticated';

  useEffect(() => {
    if (authenticated && open) {
      dispatch(setLoginModal({ open: false }));
    }
  }, [authenticated, signOut]);

  return {
    authenticated,
    user,
    signOut,
  };
};
