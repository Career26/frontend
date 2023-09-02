import { CareerResult } from '@datatypes/career';
import { mockCareersTest } from '@mocks/careerTestMocks';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

type CareerPathsSlice = {
  careerPaths?: CareerResult['careerPaths'];
  selectedCareerPathId?: string;
};

export const careerPathsInitialState: CareerPathsSlice = {
  careerPaths: mockCareersTest.careerPaths,
  selectedCareerPathId: '',
};

export const careerPathsSlice = createSlice({
  name: 'careerPath',
  initialState: careerPathsInitialState,
  reducers: {
    setCareerPaths: (state, { payload }: PayloadAction<CareerPathsSlice['careerPaths']>) => {
      state.careerPaths = payload;
    },
    setSelectedCareerPathId: (
      state,
      { payload }: PayloadAction<CareerPathsSlice['selectedCareerPathId']>,
    ) => {
      state.selectedCareerPathId = payload;
    },
  },
});

export const { setCareerPaths, setSelectedCareerPathId } = careerPathsSlice.actions;

const selectCareerPathSlice = (state: RootState) => state.careerPaths;

export const selectCareerPaths = (state: RootState) => selectCareerPathSlice(state).careerPaths;

export const selectSelectedCareerPathId = (state: RootState) =>
  selectCareerPathSlice(state).selectedCareerPathId;

export const selectSelectedCareerPath = createSelector(
  [selectSelectedCareerPathId, selectCareerPaths],
  (id, careerPaths) => {
    if (!id || !careerPaths) {
      return undefined;
    }
    return careerPaths[id];
  },
);

export default careerPathsSlice.reducer;
