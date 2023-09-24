import { SelectCareerInput } from '@datatypes/career';
import { UserProfile, Profile } from '@datatypes/profile';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@shared/config/urlConstants';

export const profileApi = createApi({
  reducerPath: 'profile',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    generateProfile: build.mutation<UserProfile, Profile>({
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
  }),
});

export const { useGenerateProfileMutation, useSelectCareerMutation } = profileApi;
