import { selectCareerPaths } from '@apis/profileApi';
import { UserProfile } from '@datatypes/profile';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

type UserSlice = {
  profile?: UserProfile;
  loginModal: {
    open: boolean;
    associateProfileId?: string;
    initialState?: 'signIn' | 'signUp' | 'resetPassword';
  };
  selectedCareerPathId?: string;
};

export const initialUserState: UserSlice = {
  profile: undefined,
  loginModal: { open: false },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<UserSlice['profile']>) => {
      state.profile = payload;
    },
    setLoginModal: (state, { payload }: PayloadAction<UserSlice['loginModal']>) => {
      state.loginModal = payload;
    },
    setSelectedCareerPathId: (
      state,
      { payload }: PayloadAction<UserSlice['selectedCareerPathId']>,
    ) => {
      state.selectedCareerPathId = payload;
    },
    resetUser: () => initialUserState,
  },
});

export const { setLoginModal, setProfile, setSelectedCareerPathId, resetUser } = userSlice.actions;

const selectUser = (state: RootState) => state.user;
export const selectLoginModal = (state: RootState) => selectUser(state).loginModal;
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
