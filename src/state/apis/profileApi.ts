import { SelectCareerInput } from '@datatypes/career';
import { UserProfile, Profile } from '@datatypes/profile';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@shared/config/urlConstants';
import { RootState } from '@state/store';
import { Auth } from 'aws-amplify';

const authedEndpoints = ['getProfile', 'associateProfile'];

export const profileApi = createApi({
  reducerPath: 'profile',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, api) => {
      if (!authedEndpoints.includes(api.endpoint)) {
        return headers;
      }
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      headers.set('Authorization', token);
      return headers;
    },
  }),
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
