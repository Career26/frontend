import { createApi } from '@reduxjs/toolkit/query/react';

import { RootState } from '@state/store';

import { getAuthorisedBaseQuery } from '@shared/utils/apiUtil';

import type {
  Question,
  RateAnswerInput,
  RatingResponse,
  SuggestionInput,
  SuggestionResponse,
} from '@datatypes/question';

export const questionsApi = createApi({
  reducerPath: 'questions',
  baseQuery: getAuthorisedBaseQuery(),
  endpoints: (build) => ({
    getQuestions: build.query<Question[], void>({
      query: () => 'questions',
    }),
    getSuggestion: build.mutation<SuggestionResponse, SuggestionInput>({
      query: (body) => ({
        url: 'suggestion',
        method: 'POST',
        body,
      }),
    }),
    rateAnswer: build.mutation<RatingResponse, RateAnswerInput>({
      query: (body) => ({
        url: 'rate',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetQuestionsQuery, useRateAnswerMutation, useGetSuggestionMutation } =
  questionsApi;

export const selectInterviewQuestions = (state: RootState) =>
  questionsApi.endpoints.getQuestions.select()(state).data;

export const selectSuggestion = (state: RootState, fixedCacheKey?: string) =>
  questionsApi.endpoints.getSuggestion.select({
    fixedCacheKey,
    requestId: undefined,
  })(state).data;

export default questionsApi.reducer;
