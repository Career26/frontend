import { UserProfile, Profile } from '@datatypes/profile';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
  reducerPath: 'profile',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://qjop4yl84g.execute-api.eu-west-1.amazonaws.com/Prod',
  }),
  endpoints: (build) => ({
    generateProfile: build.mutation<UserProfile, Profile>({
      query(body) {
        return {
          url: 'profile',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useGenerateProfileMutation } = profileApi;
