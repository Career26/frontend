import { mockInterviewQuestions } from '@mocks/interviewMocks';
import { mockUserProfile } from '@mocks/profileMocks';
import { testState } from '@shared/utils/testUtil';
import reducer, {
  addIndustryColors,
  addQuestionColors,
  initialSessionState,
  selectIndustryColors,
  selectLoginModal,
  selectSelectedCareerPath,
  selectSelectedCareerPathId,
  selectSelectedQuestion,
  selectSelectedQuestionId,
  setLoginModal,
  setSelectedCareerPathId,
  setSelectedQuestionId,
} from '@slices/sessionSlice';

describe('sessionSlice', () => {
  it('Should return login modal', () => {
    expect(selectLoginModal(testState)).toEqual(initialSessionState.loginModal);
  });
  it('Should set login modal', () => {
    expect(reducer(initialSessionState, setLoginModal({ open: true }))).toEqual({
      ...initialSessionState,
      loginModal: { open: true },
    });
  });

  it('Should return first career path ID as selected career path ID when none selected', () => {
    expect(selectSelectedCareerPathId(testState)).toEqual(
      Object.keys(mockUserProfile.careerPaths)[0],
    );
  });
  it('Should set career path ID', () => {
    const id = '1';
    expect(reducer(initialSessionState, setSelectedCareerPathId(id))).toEqual({
      ...initialSessionState,
      selectedCareerPathId: id,
    });
  });

  it('Should return 0 when no selected question ID', () => {
    expect(selectSelectedQuestionId(testState)).toEqual(0);
  });
  it('Should set selected question ID', () => {
    const id = 1;
    expect(reducer(initialSessionState, setSelectedQuestionId(id))).toEqual({
      ...initialSessionState,
      selectedQuestionId: id,
    });
  });

  it('Should return selected question', () => {
    const id = 1;
    const question = mockInterviewQuestions[id];
    const state = { ...testState, session: { ...testState.session, selectedQuestionId: id } };
    expect(selectSelectedQuestion(state)).toEqual(question);
  });
  it('Should select selected career path', () => {
    const [id, value] = Object.entries(mockUserProfile.careerPaths)[0];
    expect(selectSelectedCareerPath.resultFunc(id, mockUserProfile.careerPaths)).toEqual(value);
  });

  it('Should select industry colors', () => {
    expect(selectIndustryColors(testState)).toEqual(initialSessionState.industryColors);
  });
  it('Should select question colors', () => {
    expect(selectIndustryColors(testState)).toEqual(initialSessionState.questionColors);
  });
  it('Should add industry colors', () => {
    expect(reducer(initialSessionState, addIndustryColors(['id-1']))).toEqual({
      ...initialSessionState,
      industryColors: { 'id-1': 'pink' },
    });
  });
  it('Should add question colors', () => {
    expect(reducer(initialSessionState, addQuestionColors(['id-1']))).toEqual({
      ...initialSessionState,
      questionColors: { 'id-1': 'pink' },
    });
  });
});
