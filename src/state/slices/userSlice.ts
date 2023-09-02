import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

enum ProfileType {
  UNIVERSITY = 'UNIVERSITY',
  FREE = 'FREE',
  PAID = 'PREMIUM',
}

type UserSlice = {
  firstName: string;
  lastName: string;
  profileType: ProfileType;
  isLoggedIn: boolean;
};

export const userInitialState: UserSlice = {
  firstName: 'Clark',
  lastName: 'Kent',
  profileType: ProfileType.UNIVERSITY,
  isLoggedIn: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setFirstName: (state, { payload }: PayloadAction<string>) => {
      state.firstName = payload;
    },
    setLastName: (state, { payload }: PayloadAction<string>) => {
      state.lastName = payload;
    },
  },
});

export const { setFirstName, setLastName } = userSlice.actions;

const selectUser = (state: RootState) => state.user;
export const selectFirstName = (state: RootState) => selectUser(state).firstName;
export const selectLastName = (state: RootState) => selectUser(state).lastName;
export const selectProfileType = (state: RootState) => selectUser(state).profileType;
export const selectIsLoggedIn = (state: RootState) => selectUser(state).isLoggedIn;
export const selectIsUniversityProfile = createSelector(
  [selectProfileType],
  (profileType) => profileType === ProfileType.UNIVERSITY,
);
export const selectIsFreeProfile = createSelector(
  [selectProfileType],
  (profileType) => profileType === ProfileType.FREE,
);

export default userSlice.reducer;
