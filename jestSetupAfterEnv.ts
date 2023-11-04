import '@testing-library/jest-dom/extend-expect';
import { mockUserProfile } from './src/mocks/profileMocks';
import { mockInterviewQuestions } from './src/mocks/interviewMocks';
import * as profileApi from './src/state/apis/profileApi';
import * as questionsApi from './src/state/apis/questionsApi';
import { server } from './src/mocks/handlers';
import { Auth } from 'aws-amplify';
import * as sessionSlice from './src/state/slices/sessionSlice';

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

const [[initialCareerId, initialCareerPath]] = Object.entries(mockUserProfile.careerPaths);

jest.mock('@apis/profileApi', () => ({
  __esModule: true,
  ...jest.requireActual('@apis/profileApi'),
}));

jest.mock('@apis/questionsApi', () => ({
  __esModule: true,
  ...jest.requireActual('@apis/questionsApi'),
}));

jest.mock('@slices/sessionSlice', () => ({
  __esModule: true,
  ...jest.requireActual('@slices/sessionSlice'),
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

const originalConsole = global.console;
global.console = {
  ...global.console,
  error: (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('Error: Amplify has not been configured correctly') ||
        message.includes('validateDOMNesting'))
    ) {
      return true;
    }
    originalConsole.error(...args);
  },
};

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
beforeEach(() => {
  jest.spyOn(Auth, 'currentSession').mockResolvedValue({
    // @ts-ignore
    getIdToken: () => ({ getJwtToken: () => 'my-token' }),
  });
  jest.spyOn(sessionSlice, 'selectSelectedCareerPath').mockReturnValue(initialCareerPath);
  jest.spyOn(sessionSlice, 'selectSelectedCareerPathId').mockReturnValue(initialCareerId);
  jest.spyOn(profileApi, 'selectCareerPaths').mockReturnValue(mockUserProfile.careerPaths);
  jest.spyOn(profileApi, 'selectProfileId').mockReturnValue(mockUserProfile.identifier);
  jest.spyOn(questionsApi, 'selectInterviewQuestions').mockReturnValue(mockInterviewQuestions);
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
