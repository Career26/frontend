import { selectInterviewQuestions } from '@apis/questionsApi';
import { selectCareerPaths } from '@apis/profileApi';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { getColorsObject } from '@shared/utils/colorUtil';
import { RootState } from '@state/store';

type SessionSlice = {
  loginModal: {
    open: boolean;
    associateProfileId?: string;
    initialState?: 'signIn' | 'signUp' | 'resetPassword';
  };
  selectedQuestionId?: number;
  industryColors: { [key: string]: string };
  questionColors: { [key: string]: string };
  selectedCareerPathId?: string;
  showFeedback: boolean;
};

export const initialSessionState: SessionSlice = {
  industryColors: {},
  questionColors: {},
  selectedQuestionId: undefined,
  loginModal: { open: false },
  showFeedback: false,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
  reducers: {
    setLoginModal: (state, { payload }: PayloadAction<SessionSlice['loginModal']>) => {
      state.loginModal = payload;
    },
    setShowFeedback: (state, { payload }: PayloadAction<SessionSlice['showFeedback']>) => {
      state.showFeedback = payload;
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
      const industryColors = getColorsObject({
        initialColors: { ...state.industryColors },
        industries,
      });
      state.industryColors = industryColors;
    },
    addQuestionColors: (state, { payload: categories }: PayloadAction<string[]>) => {
      const questionColors = getColorsObject({
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
  setSelectedCareerPathId,
  resetSession,
  addIndustryColors,
  addQuestionColors,
  setSelectedQuestionId,
  setShowFeedback,
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
export const selectShowFeedback = (state: RootState) => selectSession(state).showFeedback;

export default sessionSlice.reducer;
