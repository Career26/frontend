import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@shared/config/urlConstants';

export const associateApi = createApi({
  reducerPath: 'associate',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    associateProfile: build.query<boolean, string>({
      query: (profileId) => `associate/${profileId}`,
    }),
  }),
});

export const { useLazyAssociateProfileQuery } = associateApi;
