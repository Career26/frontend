import '@testing-library/jest-dom/extend-expect';
import { mockUserProfile } from './src/mocks/profileMocks';
import { mockInterviewQuestions } from './src/mocks/interviewMocks';
import * as profileApi from './src/state/apis/profileApi';
import * as questionsApi from './src/state/apis/questionsApi';
import { server } from './src/mocks/handlers';
import { Auth } from 'aws-amplify';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

jest.mock('@apis/profileApi', () => ({
  __esModule: true,
  ...jest.requireActual('@apis/profileApi'),
}));

jest.mock('@apis/questionsApi', () => ({
  __esModule: true,
  ...jest.requireActual('@apis/questionsApi'),
}));

const mockSignOut = jest.fn();
const mockUser = {};
jest.mock('@aws-amplify/ui-react', () => ({
  __esModule: true,
  ...jest.requireActual('@aws-amplify/ui-react'),
  useAuthenticator: () => ({
    signOut: mockSignOut,
    user: mockUser,
    authStatus: 'authenticated',
    validationErrors: {},
  }),
}));

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
beforeEach(() => {
  jest.spyOn(Auth, 'currentSession').mockResolvedValue({
    // @ts-ignore
    getIdToken: () => ({ getJwtToken: () => 'my-token' }),
  });
  jest.spyOn(profileApi, 'selectCareerPaths').mockReturnValue(mockUserProfile.careerPaths);
  jest.spyOn(questionsApi, 'selectInterviewQuestions').mockReturnValue(mockInterviewQuestions);
  jest.spyOn(questionsApi, 'selectInterviewQuestions').mockReturnValue(mockInterviewQuestions);
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
