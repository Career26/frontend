import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getIndustryColors } from '@shared/utils/careerUtil';
import { RootState } from '@state/store';

type CareerSlice = {
  industryColors: { [key: string]: string };
};

export const initialCareerState: CareerSlice = {
  industryColors: {},
};

export const careerSlice = createSlice({
  name: 'career',
  initialState: initialCareerState,
  reducers: {
    addIndustryColors: (state, { payload: industries }: PayloadAction<string[]>) => {
      const industryColors = getIndustryColors({
        initialColors: { ...state.industryColors },
        industries,
      });
      state.industryColors = industryColors;
    },
  },
});

export const { addIndustryColors } = careerSlice.actions;

const selectCareerSlice = (state: RootState) => state.career;
export const selectIndustryColors = (state: RootState) => selectCareerSlice(state).industryColors;

export default careerSlice.reducer;
