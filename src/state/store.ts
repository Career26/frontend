import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { profileApi } from '@apis/profile';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import user from '@slices/userSlice';
import careerPaths from '@slices/careerPathsSlice';

export const rootReducer = combineReducers({
  user,
  careerPaths,
  [profileApi.reducerPath]: profileApi.reducer,
});

export const store = configureStore({
  reducer: {
    user,
    careerPaths,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
