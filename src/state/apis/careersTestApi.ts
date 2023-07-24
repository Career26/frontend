import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const careersTestApi = createApi({
  reducerPath: 'careersTest',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getCareersTestResult: builder.query({
      query: (name) => `pokemon/${name}`,
      transformResponse: (data) => {
        console.log(data);
        return data;
      },
    }),
  }),
});

export const { useGetCareersTestResultQuery, useLazyGetCareersTestResultQuery } = careersTestApi;
