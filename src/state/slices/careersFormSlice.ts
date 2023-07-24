import {
  initialEducationFormValues,
  initialPreferencesValues,
  initialPreviousExperienceFormValues,
} from '@careersTest/config/careersFormConstants';
import {
  EducationFormValues,
  PreferencesFormValues,
  PreviousExperienceFormValues,
} from '@careersTest/types/careersFormTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

type CareeersForm = {
  education: EducationFormValues;
  previousExperiences: PreviousExperienceFormValues;
  preferences: PreferencesFormValues;
};

export const careeersFormInitialState: CareeersForm = {
  education: initialEducationFormValues,
  previousExperiences: initialPreviousExperienceFormValues,
  preferences: initialPreferencesValues,
};

export const careeersFormSlice = createSlice({
  name: 'careersForm',
  initialState: careeersFormInitialState,
  reducers: {
    setEducationValues: (state, { payload }: PayloadAction<CareeersForm['education']>) => {
      state.education = payload;
    },
    setPreviousExperiencesValues: (
      state,
      { payload }: PayloadAction<CareeersForm['previousExperiences']>,
    ) => {
      state.previousExperiences = payload;
    },
    seetPreferencesValues: (state, { payload }: PayloadAction<CareeersForm['preferences']>) => {
      state.preferences = payload;
    },
  },
});

export const { setEducationValues, setPreviousExperiencesValues, seetPreferencesValues } =
  careeersFormSlice.actions;

const selectCareersForm = (state: RootState) => state.careersForm;
export const selectEducationValues = (state: RootState) => selectCareersForm(state).education;
export const selectPreviousExperiencesValues = (state: RootState) =>
  selectCareersForm(state).previousExperiences;
export const selectPreferencesValues = (state: RootState) => selectCareersForm(state).preferences;

export default careeersFormSlice.reducer;
