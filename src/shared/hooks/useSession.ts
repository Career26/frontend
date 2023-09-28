import { useAuthenticator } from '@aws-amplify/ui-react';

export const useSession = () => {
  const { user, signOut } = useAuthenticator((context) => [context.route]);
  return {
    user,
    signOut,
  };
};
