import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { profileApi } from '@apis/profile';
import careersForm from '@slices/careersFormSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const rootReducer = combineReducers({
  careersForm,
  [profileApi.reducerPath]: profileApi.reducer,
});

export const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    careersForm,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
