import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { profileApi } from '@apis/profileApi';
import { overviewApi } from '@apis/overviewApi';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import user from '@slices/userSlice';
import interview from '@slices/interviewSlice';
import career from '@slices/careerSlice';

export const rootReducer = combineReducers({
  interview,
  user,
  career,
  [profileApi.reducerPath]: profileApi.reducer,
  [overviewApi.reducerPath]: overviewApi.reducer,
});

export const store = configureStore({
  reducer: {
    interview,
    user,
    career,
    [profileApi.reducerPath]: profileApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      profileApi.middleware,
      overviewApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
