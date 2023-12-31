import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { Notifications } from '@mantine/notifications';

import { store } from './state/store';

import App from './App';

import awsExports from '@shared/constants/awsConstants';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
  },
});

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <MantineProvider
          theme={{
            breakpoints: {
              xs: '30em',
              sm: '48em',
              md: '64em',
              lg: '74em',
              xl: '90em',
            },
            primaryColor: 'navy',
            primaryShade: 5,
            colors: {
              navy: [
                '#f1f7ff',
                '#7e9bcd',
                '#7595c7',
                '#6c8ec1',
                '#0d3978',
                '#0b356e',
                '#093364',
                '#07305a',
                '#052d50',
                '#042a4a',
              ],
            },
          }}
        >
          <Authenticator.Provider>
            <Notifications />
            <App />
          </Authenticator.Provider>
        </MantineProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
