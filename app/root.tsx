import { Amplify } from 'aws-amplify';
import { Notifications } from '@mantine/notifications';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Provider } from 'react-redux';
import { Authenticator } from '@aws-amplify/ui-react';

import { FeedbackModal } from '@shared/components/feedback/FeedbackModal';
import { CareerTestModal } from '@shared/components/careerTestModal/CareerTestModal';

import { store } from './state/store';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';

export const meta: MetaFunction = () => {
  return [{ title: 'Career26' }, { name: 'description', content: 'Discover your perfect career!' }];
};

export const loader = async () => {
  if (process?.env?.NODE_ENV === 'production') {
    return {
      userPoolId: process?.env?.PROD_USER_POOL,
      userPoolWebClientId: process?.env?.PROD_CLIENT_ID,
    };
  }
  return {
    userPoolId: process?.env?.DEV_USER_POOL,
    userPoolWebClientId: process?.env?.DEV_CLIENT_ID,
  };
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  const { userPoolWebClientId, userPoolId } = useLoaderData<typeof loader>();
  Amplify.configure({
    Auth: {
      region: 'eu-west-1',
      userPoolId,
      userPoolWebClientId,
    },
  });
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <Provider store={store}>
          <Authenticator.Provider>
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
              <Notifications />
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
              <FeedbackModal />
              <CareerTestModal />
            </MantineProvider>
          </Authenticator.Provider>
        </Provider>
      </body>
    </html>
  );
}
