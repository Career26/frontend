import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { baseUrl } from '@shared/config/urlConstants';

import { mockUserProfile } from './profileMocks';
import { mockInterviewQuestions } from './interviewMocks';
import { mockOverview } from './overviewMocks';

export const handlers = [
  rest.get(`${baseUrl}/profile`, (_req, res, ctx) => res(ctx.json(mockUserProfile))),
  rest.get(`${baseUrl}/questions`, (_req, res, ctx) => res(ctx.json(mockInterviewQuestions))),
  rest.get(`${baseUrl}/overview/*`, (_req, res, ctx) => res(ctx.json(mockOverview))),
];

export const server = setupServer(...handlers);
