import { useLazyAssociateProfileQuery } from '@apis/profileApi';
import { notifications } from '@mantine/notifications';

import { usePageNavigation } from './usePageNavigation';

export const useAssociate = () => {
  const [associateProfileQuery, { isFetching }] = useLazyAssociateProfileQuery();
  const { goToHomepage } = usePageNavigation();

  const associateProfile = async (profileId: string, onSuccess?: () => void) => {
    try {
      await associateProfileQuery(profileId);
      notifications.show({
        title: 'Created Account',
        message: 'Successfully created account',
        color: 'green',
      });
      onSuccess?.();
      goToHomepage();
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`associate account error - ${error}`);
    }
  };

  return { associateProfile, loading: isFetching };
};
