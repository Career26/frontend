import { Question, RateAnswerInput } from '@datatypes/interview';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@shared/config/urlConstants';
import { RootState } from '@state/store';
import { Auth } from 'aws-amplify';

export const interviewApi = createApi({
  reducerPath: 'interview',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      headers.set('Authorization', token);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getInterviewQuestions: build.query<Question[], void>({
      query: () => 'questions',
    }),
    rateAnswer: build.mutation<any, RateAnswerInput>({
      query: (body) => ({
        url: 'rate',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetInterviewQuestionsQuery, useRateAnswerMutation } = interviewApi;

export const selectInterviewQuestions = (state: RootState) =>
  interviewApi.endpoints.getInterviewQuestions.select()(state).data;
