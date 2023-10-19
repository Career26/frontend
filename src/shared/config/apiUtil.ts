import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Auth } from 'aws-amplify';
import { UserProfile } from '@datatypes/profile';

import { baseUrl } from './urlConstants';

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

export const getProfileWithFilteredCareerPaths = (data: UserProfile) => {
  const { careerPaths } = data;
  const selectedCareerPaths = Object.entries(careerPaths).reduce(
    (agg, [careerId, careerPath]) =>
      !careerPath.selected ? agg : { ...agg, [careerId]: careerPath },
    {},
  );
  return { ...data, careerPaths: selectedCareerPaths };
};
