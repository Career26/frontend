import '@testing-library/jest-dom/extend-expect';
import { mockUserProfile } from './src/mocks/profileMocks';
import { mockInterviewQuestions } from './src/mocks/interviewMocks';
import * as profileApi from './src/state/apis/profileApi';
import * as questionsApi from './src/state/apis/questionsApi';

import { server } from './src/mocks/handlers';

import { Auth } from 'aws-amplify';

jest.mock('@apis/profileApi', () => ({
  __esModule: true,
  ...jest.requireActual('@apis/profileApi'),
}));

jest.mock('@apis/questionsApi', () => ({
  __esModule: true,
  ...jest.requireActual('@apis/questionsApi'),
}));

const mockToken = 'my-token';

beforeAll(() => server.listen());
beforeEach(() => {
  server.events.on('request:start', () => {
    console.log('here');
  });
  jest.spyOn(Auth, 'currentSession').mockResolvedValue({
    // @ts-ignore
    getIdToken: () => ({ getJwtToken: () => mockToken }),
  });
  jest.spyOn(profileApi, 'selectCareerPaths').mockReturnValue(mockUserProfile.careerPaths);
  jest.spyOn(questionsApi, 'selectInterviewQuestions').mockReturnValue(mockInterviewQuestions);
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
