import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LoadingPage } from '@shared/components/LoadingPage';
import { urls } from '@shared/config/urlConstants';
import { PageHeader } from '@shared/components/pageHeader/PageHeader';
import { useAppSelector } from '@state/store';
import { selectSelectedCareerPathId } from '@slices/userSlice';

import { HomePage } from '../homePage/HomePage';
import { LandingPage } from '../landingPage/LandingPage';
import { CareerTest } from '../careerTest/CareerTest';
import { OverviewPage } from '../overview/OverviewPage';

export const App = () => {
  const defaultCareerId = useAppSelector(selectSelectedCareerPathId);
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <PageHeader />
        <Switch>
          <Route path={urls.landingPage} exact component={LandingPage} />
          <Route path={urls.home} component={HomePage} />
          <Route path={urls.careersTest} component={CareerTest} />
          <Route
            path={`${urls.overview}/:careerId?`}
            render={({
              match: {
                params: { careerId },
              },
            }) => {
              if (!careerId) {
                return <Redirect to={`${urls.overview}/${defaultCareerId}`} />;
              }
              return <OverviewPage />;
            }}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
