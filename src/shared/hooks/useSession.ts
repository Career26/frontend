import { useAuthenticator } from '@aws-amplify/ui-react';
import { selectLoginModal, setLoginModal } from '@slices/userSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import { useEffect } from 'react';

export const useSession = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(selectLoginModal);
  const { user, signOut } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    if (open) {
      dispatch(setLoginModal({ open: false }));
    }
  }, [user]);

  return {
    user,
    signOut,
  };
};
