import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from '@slices/userSlice';

export const rootReducer = combineReducers({ user });

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
