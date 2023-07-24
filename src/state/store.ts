import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { careersTestApi } from '@apis/careersTestApi';
import careersForm from '@slices/careersFormSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const rootReducer = combineReducers({
  careersForm,
  [careersTestApi.reducerPath]: careersTestApi.reducer,
});

export const store = configureStore({
  reducer: {
    [careersTestApi.reducerPath]: careersTestApi.reducer,
    careersForm,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(careersTestApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
