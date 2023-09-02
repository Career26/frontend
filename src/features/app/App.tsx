import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoadingPage } from '@shared/components/LoadingPage';
import { urls } from '@shared/config/urlConstants';
import { PageHeader } from '@shared/components/pageHeader/PageHeader';

import { HomePage } from '../homePage/HomePage';
import { LandingPage } from '../landingPage/LandingPage';
import { CareerTest } from '../careerTest/CareerTest';
import { OverviewPage } from '../overview/OverviewPage';
import { featuresTag, pricingTag } from '../landingPage/config/landingPageConstants';

export const App = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingPage />}>
      <PageHeader
        links={[
          { label: 'Features', link: `#${featuresTag}` },
          { label: 'Pricing', link: `#${pricingTag}` },
        ]}
      />
      <Switch>
        <Route path={urls.landingPage} exact component={LandingPage} />
        <Route path={urls.home} component={HomePage} />
        <Route path={urls.careersTest} component={CareerTest} />
        <Route path={urls.overview} component={OverviewPage} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);
