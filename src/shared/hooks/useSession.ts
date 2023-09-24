import { useAuthenticator } from '@aws-amplify/ui-react';

export const useSession = () => {
  const { route } = useAuthenticator((context) => [context.route]);
  const loggedIn = route !== 'authenticated';
  return {
    loggedIn,
  };
};
