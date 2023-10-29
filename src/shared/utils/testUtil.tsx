import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import React, { PropsWithChildren } from 'react';
import overview, { overviewApi } from '@apis/overviewApi';
import profile, { profileApi } from '@apis/profileApi';
import questions, { questionsApi } from '@apis/questionsApi';
import session, { initialSessionState } from '@slices/sessionSlice';
import { AppStore, RootState, store as stateStore } from '@state/store';

export const testState: RootState = {
  session: initialSessionState,
  [questionsApi.reducerPath]: questionsApi.reducer(undefined, { type: 'questions' }),
  [overviewApi.reducerPath]: overviewApi.reducer(undefined, { type: 'overview' }),
  [profileApi.reducerPath]: profileApi.reducer(undefined, { type: 'profile' }),
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const Wrapper = ({ children }: PropsWithChildren) => (
  <Provider store={stateStore}>{children}</Provider>
);

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { session, profile, overview, questions }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  const SubWrapper = ({ children }: PropsWithChildren): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: SubWrapper, ...renderOptions }) };
};
