import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoadingPage } from '@shared/components/LoadingPage';

import { UserPage } from '../userPage/UserPage';
import { HomePage } from '../homePage/HomePage';
import '@shared/styles/globalStyles.scss';

export const App = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        <Route path="/user" component={UserPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);
