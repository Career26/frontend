import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Auth } from 'aws-amplify';
import { baseUrl } from '@shared/config/urlConstants';

export const getAuthorisedBaseQuery = (unauthorisedEndpoints?: string[]) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, api) => {
      if (unauthorisedEndpoints?.includes(api.endpoint)) {
        return headers;
      }
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      headers.set('Authorization', token);
      return headers;
    },
  });
