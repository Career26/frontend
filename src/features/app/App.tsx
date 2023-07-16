import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { LoadingPage } from '@shared/components/LoadingPage';
import { urls } from '@shared/config/urlConstants';

import { HomePage } from '../homePage/HomePage';
import { LandingPage } from '../landingPage/LandingPage';
import { CareerTest } from '../careerTest/CareerTest';

// import '@shared/styles/globalStyles.scss';

export const App = () => (
  // <MantineProvider
  //   theme={{
  //     fontFamily: 'sans-serif',
  //     colorScheme: 'light',
  //     fontSizes: { xs: '6', sm: '8', md: '12', xl: '16' },
  //   }}
  // >
  <BrowserRouter>
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        <Route path={urls.landingPage} exact component={LandingPage} />
        <Route path={urls.home} component={HomePage} />
        <Route path={urls.careerTest} component={CareerTest} />
      </Switch>
    </Suspense>
  </BrowserRouter>
  // </MantineProvider>
);
