import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LoadingScreen } from '@shared/components/loadingScreen/LoadingScreen';
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
  const { authenticated, signOut } = useSession();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <PageHeader authenticated={authenticated} signOut={signOut} />
        <Switch>
          <Route
            path={urls.landingPage}
            exact
            component={!authenticated ? LandingPage : HomePage}
          />
          <Route path={urls.careersTest} component={CareerTest} />
          <Route
            path={`${urls.overview}/:careerId?`}
            render={({
              match: {
                params: { careerId },
              },
            }) => {
              if (!authenticated) {
                return <Redirect to={urls.landingPage} />;
              }
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
              if (!authenticated) {
                return <Redirect to={urls.landingPage} />;
              }
              if (!careerId) {
                return <Redirect to={`${urls.interviews}/${defaultCareerId}}`} />;
              }
              if (!interviewId) {
                return <Redirect to={`${urls.interviews}/${careerId}/${defaultInterviewId}`} />;
              }
              return <InterviewPage />;
            }}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
