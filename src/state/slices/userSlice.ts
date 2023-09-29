import { CareerResult } from '@datatypes/career';
import { UserProfile } from '@datatypes/profile';
import { profileResponseMock } from '@mocks/profileMocks';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

type UserSlice = {
  profile?: UserProfile;
  loginModal: {
    open: boolean;
    onComplete?: () => void;
    initialState?: 'signIn' | 'signUp' | 'resetPassword';
  };
  selectedCareerPathId?: string;
};

export const userInitialState: UserSlice = {
  profile: profileResponseMock,
  loginModal: { open: false },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<UserSlice['profile']>) => {
      state.profile = payload;
    },
    setLoginModal: (state, { payload }: PayloadAction<UserSlice['loginModal']>) => {
      state.loginModal = payload;
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

export const { setLoginModal, setProfile, setCareerPaths, setSelectedCareerPathId } =
  userSlice.actions;

const selectUser = (state: RootState) => state.user;
export const selectLoginModal = (state: RootState) => selectUser(state).loginModal;
export const selectProfile = (state: RootState) => selectUser(state).profile;
export const selectProfileId = (state: RootState) => selectUser(state).profile?.identifier || '';
export const selectCareerPaths = (state: RootState) => selectUser(state).profile?.careerPaths;
export const selectSelectedCareerPathId = (state: RootState) =>
  selectUser(state).selectedCareerPathId || Object.keys(selectCareerPaths(state) || {})[0];

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
