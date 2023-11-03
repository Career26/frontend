import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import React, { PropsWithChildren } from 'react';
import { overviewApi } from '@apis/overviewApi';
import { profileApi } from '@apis/profileApi';
import { questionsApi } from '@apis/questionsApi';
import { initialSessionState } from '@slices/sessionSlice';
import { AppStore, RootState, store as stateStore } from '@state/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import { MantineProvider } from '@mantine/core';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const testState: RootState = {
  session: initialSessionState,
  [questionsApi.reducerPath]: questionsApi.reducer(undefined, { type: 'questions' }),
  [overviewApi.reducerPath]: overviewApi.reducer(undefined, { type: 'overview' }),
  [profileApi.reducerPath]: profileApi.reducer(undefined, { type: 'profile' }),
};

export const Wrapper = ({ children }: PropsWithChildren) => (
  <MantineProvider>
    <Provider store={stateStore}>{children}</Provider>
  </MantineProvider>
);

export const renderWithProviders = (
  ui: React.ReactElement,
  renderOptions: ExtendedRenderOptions = {},
) => {
  const SubWrapper = ({ children }: PropsWithChildren): JSX.Element => (
    <Provider store={stateStore}>
      <MantineProvider>{children}</MantineProvider>
    </Provider>
  );
  setupListeners(stateStore.dispatch);
  // Return an object with the store and all of RTL's query functions
  return render(ui, { wrapper: SubWrapper, ...renderOptions });
};

// export const renderWithProviders = (ui: React.ReactNode) =>
//   render(<>{ui}</>, {
//     wrapper: Wrapper,
//   });
