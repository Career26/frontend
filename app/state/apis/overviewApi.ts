import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@shared/constants/urlConstants';

import type { CareerOverviewInput, Overview } from '@datatypes/overview';

export const overviewApi = createApi({
  reducerPath: 'overview',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getCareerOverview: build.query<Overview, CareerOverviewInput>({
      query: ({ careerId, profileId }) => `overview/${profileId}/${careerId}`,
    }),
  }),
});

export const { useGetCareerOverviewQuery } = overviewApi;

export default overviewApi.reducer;
