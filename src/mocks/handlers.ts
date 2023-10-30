import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { baseUrl } from '@shared/config/urlConstants';

import { mockUserProfile } from './profileMocks';

export const handlers = [
  rest.get('http://localhost:3000/profile', (req, res, ctx) => {
    console.log(req);
    return res(ctx.json(mockUserProfile));
  }),
];

export const server = setupServer(...handlers);
