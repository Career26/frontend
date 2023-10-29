import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { mockUserProfile } from './profileMocks';

export const handlers = [http.get('/profile', () => HttpResponse.json(mockUserProfile))];

export const server = setupServer(...handlers);
