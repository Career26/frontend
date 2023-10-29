import '@testing-library/jest-dom/extend-expect';
import { mockUserProfile } from './src/mocks/profileMocks';
import { mockInterviewQuestions } from './src/mocks/interviewMocks';
import * as profileApi from './src/state/apis/profileApi';
import * as questionsApi from './src/state/apis/questionsApi';

jest.mock('@apis/profileApi', () => ({
  __esModule: true,
  ...jest.requireActual('@apis/profileApi'),
}));

jest.mock('@apis/questionsApi', () => ({
  __esModule: true,
  ...jest.requireActual('@apis/questionsApi'),
}));

beforeEach(() => {
  jest.spyOn(profileApi, 'selectCareerPaths').mockReturnValue(mockUserProfile.careerPaths);
  jest.spyOn(questionsApi, 'selectInterviewQuestions').mockReturnValue(mockInterviewQuestions);
});
