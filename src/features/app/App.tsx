import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LoadingScreen } from '@shared/components/loadingScreen/LoadingScreen';
import { urls } from '@shared/config/urlConstants';
import { PageHeader } from '@shared/components/pageHeader/PageHeader';
import { useAppDispatch, useAppSelector } from '@state/store';
import { selectCareerPaths, selectSelectedCareerPathId } from '@slices/userSlice';
import { selectSelectedInterviewId } from '@slices/interviewSlice';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { addIndustryColors } from '@slices/careerSlice';

import { HomePage } from '../homePage/HomePage';
import { LandingPage } from '../landingPage/LandingPage';
import { CareerTest } from '../careerTest/CareerTest';
import { OverviewPage } from '../overview/OverviewPage';
import { InterviewPage } from '../interview/InterviewPage';

export const App = () => {
  const dispatch = useAppDispatch();
  const defaultCareerId = useAppSelector(selectSelectedCareerPathId);
  const defaultInterviewId = useAppSelector(selectSelectedInterviewId);
  const { authenticated, signOut } = useAuthUser();

  const careerPaths = useAppSelector(selectCareerPaths);

  useEffect(() => {
    if (!careerPaths) {
      return;
    }
    const industries = Object.values(careerPaths).map(({ industry }) => industry);
    dispatch(addIndustryColors(industries));
  }, [careerPaths]);

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
