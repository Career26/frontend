import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LoadingPage } from '@shared/components/LoadingPage';
import { urls } from '@shared/config/urlConstants';
import { PageHeader } from '@shared/components/pageHeader/PageHeader';
import { useAppSelector } from '@state/store';
import { selectSelectedCareerPathId } from '@slices/userSlice';
import { selectSelectedInterviewId } from '@slices/interviewSlice';
import { useSession } from '@shared/hooks/useSession';

import { HomePage } from '../homePage/HomePage';
import { LandingPage } from '../landingPage/LandingPage';
import { CareerTest } from '../careerTest/CareerTest';
import { OverviewPage } from '../overview/OverviewPage';
import { InterviewPage } from '../interview/InterviewPage';

export const App = () => {
  const defaultCareerId = useAppSelector(selectSelectedCareerPathId);
  const defaultInterviewId = useAppSelector(selectSelectedInterviewId);
  const { loggedIn } = useSession();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <PageHeader />
        <Switch>
          <Route path={urls.landingPage} exact component={LandingPage} />
          <Route path={urls.careersTest} component={CareerTest} />
          {loggedIn && (
            <>
              <Route path={urls.home} component={HomePage} />
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
              <Route
                path={`${urls.interviews}/:careerId?/:interviewId?`}
                render={({
                  match: {
                    params: { careerId, interviewId },
                  },
                }) => {
                  if (!careerId) {
                    return <Redirect to={`${urls.interviews}/${defaultCareerId}}`} />;
                  }
                  if (!interviewId) {
                    return <Redirect to={`${urls.interviews}/${careerId}/${defaultInterviewId}`} />;
                  }
                  return <InterviewPage />;
                }}
              />
            </>
          )}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
