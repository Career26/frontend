import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { mockUserProfile } from './profileMocks';
import { mockInterviewQuestions, mockRating, mockSuggestion } from './interviewMocks';
import { mockOverview } from './overviewMocks';

import { baseUrl } from '@shared/constants/urlConstants';

export const handlers = [
  rest.get(`${baseUrl}/profile`, (_req, res, ctx) => res(ctx.json(mockUserProfile))),
  rest.post(`${baseUrl}/profile`, (_req, res, ctx) => res(ctx.json(mockUserProfile))),
  rest.post(`${baseUrl}/associate/*`, (_req, res, ctx) => res(ctx.json(true))),
  rest.get(`${baseUrl}/select`, (_req, res, ctx) => res(ctx.json(true))),
  rest.get(`${baseUrl}/questions`, (_req, res, ctx) => res(ctx.json(mockInterviewQuestions))),
  rest.get(`${baseUrl}/overview/*`, (_req, res, ctx) => res(ctx.json(mockOverview))),
  rest.post(`${baseUrl}/suggestion`, (_req, res, ctx) => res(ctx.json(mockSuggestion))),
  rest.post(`${baseUrl}/rate`, (_req, res, ctx) => res(ctx.json(mockRating))),
];

export const server = setupServer(...handlers);
