import { InterviewQuestion, mockInterviewQuestions } from '@mocks/interviewMocks';
import { profileResponseMock } from '@mocks/profileMocks';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

type InterviewSlice = {
  interviewQuestions?: { [key: string]: InterviewQuestion };
  selectedInterviewId?: string;
};

export const interviewInitialState: InterviewSlice = {
  interviewQuestions: Object.keys(profileResponseMock.careerPaths).reduce(
    (agg, id) => ({ ...agg, [id]: { mockInterviewQuestions } }),
    {},
  ),
  selectedInterviewId: Object.keys(mockInterviewQuestions)[0],
};

export const interviewSlice = createSlice({
  name: 'interview',
  initialState: interviewInitialState,
  reducers: {
    setSelectedInterviewId: (
      state,
      { payload }: PayloadAction<InterviewSlice['selectedInterviewId']>,
    ) => {
      state.selectedInterviewId = payload;
    },
  },
});

export const { setSelectedInterviewId } = interviewSlice.actions;

const selectInterview = (state: RootState) => state.interview;
export const selectInterviewQuestions = (state: RootState) =>
  selectInterview(state).interviewQuestions;
export const selectSelectedInterviewId = (state: RootState) =>
  selectInterview(state).selectedInterviewId || '';

export default interviewSlice.reducer;