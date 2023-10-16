import { selectInterviewQuestions } from '@apis/questionsApi';
import { selectCareerPaths } from '@apis/profileApi';
import { UserProfile } from '@datatypes/profile';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { getIndustryColors } from '@shared/utils/careerUtil';
import { RootState } from '@state/store';

type SessionSlice = {
  profile?: UserProfile;
  loginModal: {
    open: boolean;
    associateProfileId?: string;
    initialState?: 'signIn' | 'signUp' | 'resetPassword';
  };
  selectedQuestionId?: number;
  industryColors: { [key: string]: string };
  questionColors: { [key: string]: string };
  selectedCareerPathId?: string;
};

export const initialSessionState: SessionSlice = {
  profile: undefined,
  industryColors: {},
  questionColors: {},
  selectedQuestionId: undefined,
  loginModal: { open: false },
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<SessionSlice['profile']>) => {
      state.profile = payload;
    },
    setLoginModal: (state, { payload }: PayloadAction<SessionSlice['loginModal']>) => {
      state.loginModal = payload;
    },
    setSelectedCareerPathId: (
      state,
      { payload }: PayloadAction<SessionSlice['selectedCareerPathId']>,
    ) => {
      state.selectedCareerPathId = payload;
    },
    setSelectedQuestionId: (
      state,
      { payload }: PayloadAction<SessionSlice['selectedQuestionId']>,
    ) => {
      state.selectedQuestionId = payload;
    },
    addIndustryColors: (state, { payload: industries }: PayloadAction<string[]>) => {
      const industryColors = getIndustryColors({
        initialColors: { ...state.industryColors },
        industries,
      });
      state.industryColors = industryColors;
    },
    addQuestionColors: (state, { payload: categories }: PayloadAction<string[]>) => {
      const questionColors = getIndustryColors({
        initialColors: { ...state.questionColors },
        industries: categories,
      });
      state.questionColors = questionColors;
    },
    resetSession: () => initialSessionState,
  },
});

export const {
  setLoginModal,
  setProfile,
  setSelectedCareerPathId,
  resetSession,
  addIndustryColors,
  addQuestionColors,
  setSelectedQuestionId,
} = sessionSlice.actions;

const selectSession = (state: RootState) => state.session;
export const selectSelectedQuestionId = (state: RootState) =>
  selectSession(state).selectedQuestionId || 0;
export const selectSelectedQuestion = (state: RootState) => {
  const questions = selectInterviewQuestions(state);
  const id = selectSelectedQuestionId(state);
  return questions?.[id];
};
export const selectLoginModal = (state: RootState) => selectSession(state).loginModal;
export const selectSelectedCareerPathId = (state: RootState) =>
  selectSession(state).selectedCareerPathId || Object.keys(selectCareerPaths(state) || {})[0];

export const selectSelectedCareerPath = createSelector(
  [selectSelectedCareerPathId, selectCareerPaths],
  (id, careerPaths) => {
    if (!id || !careerPaths) {
      return undefined;
    }
    return careerPaths[id];
  },
);

export const selectIndustryColors = (state: RootState) => selectSession(state).industryColors;
export const selectQuestionColors = (state: RootState) => selectSession(state).questionColors;

export default sessionSlice.reducer;
