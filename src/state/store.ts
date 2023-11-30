import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { profileApi } from '@apis/profileApi';
import { overviewApi } from '@apis/overviewApi';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import session from '@slices/sessionSlice';
import { questionsApi } from '@apis/questionsApi';
import { feedbackApi } from '@apis/feedbackApi';

export const rootReducer = combineReducers({
  session,
  [questionsApi.reducerPath]: questionsApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [overviewApi.reducerPath]: overviewApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
});

export const store = configureStore({
  reducer: {
    session,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      questionsApi.middleware,
      profileApi.middleware,
      overviewApi.middleware,
      feedbackApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
