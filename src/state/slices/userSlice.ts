import { CareerResult } from '@datatypes/career';
import { UserProfile } from '@datatypes/profile';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

type UserSlice = {
  profile?: UserProfile;
  isLoggedIn: boolean;
  selectedCareerPathId?: string;
};

export const userInitialState: UserSlice = {
  profile: undefined,
  isLoggedIn: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<UserSlice['profile']>) => {
      state.profile = payload;
    },
    setCareerPaths: (state, { payload }: PayloadAction<CareerResult['careerPaths']>) => {
      if (!state.profile) {
        return;
      }
      state.profile = { ...state.profile, careerPaths: payload };
    },
    setSelectedCareerPathId: (
      state,
      { payload }: PayloadAction<UserSlice['selectedCareerPathId']>,
    ) => {
      state.selectedCareerPathId = payload;
    },
  },
});

export const { setProfile, setCareerPaths, setSelectedCareerPathId } = userSlice.actions;

const selectUser = (state: RootState) => state.user;
export const selectProfile = (state: RootState) => selectUser(state).profile;
export const selectIsLoggedIn = (state: RootState) => selectUser(state).isLoggedIn;
export const selectCareerPaths = (state: RootState) => selectUser(state).profile?.careerPaths;
export const selectSelectedCareerPathId = (state: RootState) =>
  selectUser(state).selectedCareerPathId;

export const selectSelectedCareerPath = createSelector(
  [selectSelectedCareerPathId, selectCareerPaths],
  (id, careerPaths) => {
    if (!id || !careerPaths) {
      return undefined;
    }
    return careerPaths[id];
  },
);

export default userSlice.reducer;
