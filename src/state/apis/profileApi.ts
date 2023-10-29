import { SelectCareerInput } from '@datatypes/career';
import { UserProfile, Profile } from '@datatypes/profile';
import { createApi } from '@reduxjs/toolkit/query/react';
import { getAuthorisedBaseQuery } from '@shared/config/apiUtil';
import { RootState } from '@state/store';

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
  useCreateProfileMutation,
  useSelectCareerMutation,
  useLazyAssociateProfileQuery,
} = profileApi;

export const selectProfileState = (state: RootState) =>
  profileApi.endpoints.getProfile.select()(state).data;

export const selectProfile = (state: RootState) => selectProfileState(state)?.profile;

export const selectCareerPaths = (state: RootState) => selectProfileState(state)?.careerPaths;

export const selectProfileId = (state: RootState) => selectProfileState(state)?.identifier;

export default profileApi.reducer;
