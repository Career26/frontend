import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoadingPage } from '@shared/components/LoadingPage';
import { urls } from '@shared/config/urlConstants';

import { HomePage } from '../homePage/HomePage';
import { LandingPage } from '../landingPage/LandingPage';
import { CareerTest } from '../careerTest/CareerTest';

export const App = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        <Route path={urls.landingPage} exact component={LandingPage} />
        <Route path={urls.home} component={HomePage} />
        <Route path={urls.careersTest} component={CareerTest} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);
