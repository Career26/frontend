import '@testing-library/jest-dom/extend-expect';
import { Auth } from 'aws-amplify';
import failOnConsole from 'jest-fail-on-console';
import { mockUserProfile } from '../src/mocks/profileMocks';
import { mockInterviewQuestions } from '../src/mocks/interviewMocks';
import * as profileApi from '../src/state/apis/profileApi';
import * as questionsApi from '../src/state/apis/questionsApi';
import { server } from '../src/mocks/handlers';

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

failOnConsole({
  shouldFailOnWarn: false,
  silenceMessage: (errorMessage) => {
    // ignore amplify config for testing
    if (/Error: Amplify has not been configured correctly/.test(errorMessage)) {
      return true;
    }
    // ignore button within button for testing career navigation
    if (/validateDOMNesting/.test(errorMessage)) {
      return true;
    }
    return false;
  },
});

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
beforeEach(() => {
  jest.spyOn(Auth, 'currentSession').mockResolvedValue({
    // @ts-ignore
    getIdToken: () => ({ getJwtToken: () => 'my-token' }),
  });
  jest.spyOn(profileApi, 'selectCareerPaths').mockReturnValue(mockUserProfile.careerPaths);
  jest.spyOn(profileApi, 'selectProfileId').mockReturnValue(mockUserProfile.identifier);
  jest.spyOn(questionsApi, 'selectInterviewQuestions').mockReturnValue(mockInterviewQuestions);
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
