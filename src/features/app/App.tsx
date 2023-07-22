import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoadingPage } from '@shared/components/LoadingPage';
import { urls } from '@shared/config/urlConstants';

import { HomePage } from '../homePage/HomePage';
import { LandingPage } from '../landingPage/LandingPage';
import { CareersTest } from '../careersTest/CareersTest';
import { ThemeProvider, createTheme } from '@mui/material';

// const theme = createTheme({
//   palette: {
//     primary: { main: '#2196f3' },
//   },
// });

export const App = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        <Route path={urls.landingPage} exact component={LandingPage} />
        <Route path={urls.home} component={HomePage} />
        <Route path={urls.careersTest} component={CareersTest} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);
