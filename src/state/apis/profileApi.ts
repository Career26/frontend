import { createApi } from '@reduxjs/toolkit/query/react';

import { RootState } from '@state/store';

import { getAuthorisedBaseQuery } from '@shared/utils/apiUtil';

import type { SelectCareerInput } from '@datatypes/career';
import type { UserProfile, Profile } from '@datatypes/profile';

const unauthorisedEndpoints = ['selectCareer', 'createProfile'];

export const profileApi = createApi({
  reducerPath: 'profile',
  baseQuery: getAuthorisedBaseQuery(unauthorisedEndpoints),
  endpoints: (build) => ({
    createProfile: build.mutation<UserProfile, Profile>({
      query: (body) => ({
        url: 'profile',
        method: 'POST',
        body,
      }),
    }),
    selectCareer: build.mutation<boolean, SelectCareerInput>({
      query: (body) => ({
        url: 'select',
        method: 'POST',
        body,
      }),
    }),
    getProfile: build.query<UserProfile, void>({
      query: () => 'profile',
    }),
    associateProfile: build.query<boolean, string>({
      query: (profileId) => `associate/${profileId}`,
    }),
  }),
});

export const {
  useLazyGetProfileQuery,
  useGetProfileQuery,
  useCreateProfileMutation,
  useSelectCareerMutation,
  useLazyAssociateProfileQuery,
} = profileApi;

export const selectProfileState = (state: RootState) =>
  profileApi.endpoints.getProfile.select()(state).data;

export const selectProfile = (state: RootState) => selectProfileState(state)?.profile;
export const selectMentorProfile = (state: RootState) => selectProfileState(state)?.mentor;
export const selectCareerPaths = (state: RootState) => selectProfileState(state)?.careerPaths;

export const selectProfileId = (state: RootState) => selectProfileState(state)?.identifier;

export default profileApi.reducer;
