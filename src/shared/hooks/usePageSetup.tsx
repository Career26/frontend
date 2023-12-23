import { useEffect } from 'react';

import {
  selectCareerPaths,
  selectProfileId,
  selectProfileState,
  useLazyGetProfileQuery,
} from '@apis/profileApi';

import { addIndustryColors, selectLoginModal } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import { useAuthUser } from './useAuthUser';
import { useCareerTestStorage } from './useCareerTestStorage';

export const usePageSetup = () => {
  const dispatch = useAppDispatch();
  const { authenticated, loading, unauthenticated } = useAuthUser();
  const careerPaths = useAppSelector(selectCareerPaths);
  const profileId = useAppSelector(selectProfileId);
  const profile = useAppSelector(selectProfileState);
  const [getProfile, { isFetching }] = useLazyGetProfileQuery();
  const { setupFormValues } = useCareerTestStorage();
  const { open: loginOpen } = useAppSelector(selectLoginModal);

  useEffect(() => {
    if (!careerPaths || !profile) {
      return;
    }
    const industries = Object.values(careerPaths).map(({ industry }) => industry);
    dispatch(addIndustryColors(industries));
    setupFormValues(profile);
  }, [careerPaths, profile]);

  useEffect(() => {
    if (authenticated && !profileId && !loginOpen) {
      getProfile();
    }
  }, [authenticated, profileId, loginOpen]);

  return {
    loading: loading || isFetching,
    authenticated,
    unauthenticated,
  };
};
