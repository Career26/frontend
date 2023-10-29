import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { baseUrl } from '@shared/config/urlConstants';

import { mockUserProfile } from './profileMocks';

export const handlers = [http.get(`${baseUrl}/profile`, () => HttpResponse.json(mockUserProfile))];

export const server = setupServer(...handlers);
