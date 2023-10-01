import { SelectCareerInput } from '@datatypes/career';
import { UserProfile, Profile } from '@datatypes/profile';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@shared/config/urlConstants';
import { Auth } from 'aws-amplify';

export const profileApi = createApi({
  reducerPath: 'profile',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
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
