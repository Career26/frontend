import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

type UserSlice = {
  firstName: string;
  lastName: string;
};

export const userInitialState: UserSlice = {
  firstName: 'Clark',
  lastName: 'Kent',
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

export default userSlice.reducer;
