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
  deleteAccountModal: {
    open: boolean;
  };
  industryColors: { [key: string]: string };
  selectedCareerPathId?: string;
};

export const initialSessionState: SessionSlice = {
  profile: undefined,
  industryColors: {},
  loginModal: { open: false },
  deleteAccountModal: { open: false },
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
    setDeleteAccountModal: (
      state,
      { payload }: PayloadAction<SessionSlice['deleteAccountModal']>,
    ) => {
      state.deleteAccountModal = payload;
    },
    setSelectedCareerPathId: (
      state,
      { payload }: PayloadAction<SessionSlice['selectedCareerPathId']>,
    ) => {
      state.selectedCareerPathId = payload;
    },
    addIndustryColors: (state, { payload: industries }: PayloadAction<string[]>) => {
      const industryColors = getIndustryColors({
        initialColors: { ...state.industryColors },
        industries,
      });
      state.industryColors = industryColors;
    },
    resetSession: () => initialSessionState,
  },
});

export const {
  setLoginModal,
  setDeleteAccountModal,
  setProfile,
  setSelectedCareerPathId,
  resetSession,
  addIndustryColors,
} = sessionSlice.actions;

const selectSession = (state: RootState) => state.session;
export const selectLoginModal = (state: RootState) => selectSession(state).loginModal;
export const selectDeleteAccountModal = (state: RootState) =>
  selectSession(state).deleteAccountModal;
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

export default sessionSlice.reducer;
