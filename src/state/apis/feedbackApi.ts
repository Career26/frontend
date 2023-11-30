import { Feedback } from '@datatypes/feedback';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@shared/config/urlConstants';

export const feedbackApi = createApi({
  reducerPath: 'feedback',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    submitFeedback: build.mutation<boolean, Feedback>({
      query: (body) => ({ url: 'feedback', method: 'POST', body }),
    }),
  }),
});

export const { useSubmitFeedbackMutation } = feedbackApi;

export default feedbackApi.reducer;
