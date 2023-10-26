import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { urls } from '@shared/config/urlConstants';
import { useAppDispatch, useAppSelector } from '@state/store';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import {
  addIndustryColors,
  selectSelectedCareerPathId,
  selectSelectedQuestionId,
} from '@slices/sessionSlice';
import { selectCareerPaths, selectProfileId, useLazyGetProfileQuery } from '@apis/profileApi';
import { SettingsPage } from '@features/settings/SettingsPage';
import { LoadingLens } from '@shared/components/loadingScreen/LoadingLens';
import { useCareerTestStorage } from '@careerTest/hooks/useCareerTestStorage';

import { HomePage } from '../homePage/HomePage';
import { LandingPage } from '../landingPage/LandingPage';
import { CareerTest } from '../careerTest/CareerTest';
import { OverviewPage } from '../overview/OverviewPage';
import { InterviewPage } from '../interview/InterviewPage';

export const App = () => {
  const dispatch = useAppDispatch();
  const defaultCareerId = useAppSelector(selectSelectedCareerPathId);
  const defaultQuestionId = useAppSelector(selectSelectedQuestionId);
  const { authenticated, unauthenticated } = useAuthUser();
  const careerPaths = useAppSelector(selectCareerPaths);
  const profileId = useAppSelector(selectProfileId);
  const [getProfile, { isFetching }] = useLazyGetProfileQuery();
  const { storeTestValues } = useCareerTestStorage();

  useEffect(() => {
    if (!careerPaths) {
      return;
    }
    const industries = Object.values(careerPaths).map(({ industry }) => industry);
    dispatch(addIndustryColors(industries));
    storeTestValues({ key: 'careerPaths', value: careerPaths });
  }, [careerPaths]);

  useEffect(() => {
    if (authenticated && !profileId) {
      getProfile();
    }
  }, [authenticated, profileId]);

  if (isFetching) {
    return <LoadingLens />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingLens />}>
        <Switch>
          <Route
            path={urls.landingPage}
            exact
            render={() => {
              if (authenticated) {
                return <HomePage />;
              }
              if (unauthenticated) {
                return <LandingPage />;
              }
              return <LoadingLens />;
            }}
          />
          <Route path={urls.careersTest} component={CareerTest} />
          <Route
            path={`${urls.overview}/:careerId?`}
            render={({
              match: {
                params: { careerId },
              },
            }) => {
              if (unauthenticated) {
                return <Redirect to={urls.landingPage} />;
              }
              if (!authenticated) {
                return <LoadingLens />;
              }
              if (!careerId) {
                return <Redirect to={`${urls.overview}/${defaultCareerId}`} />;
              }
              return <OverviewPage />;
            }}
          />
          <Route
            path={`${urls.questions}/:careerId?/:interviewId?`}
            render={({
              match: {
                params: { careerId, interviewId },
              },
            }) => {
              if (unauthenticated) {
                return <Redirect to={urls.landingPage} />;
              }
              if (!authenticated) {
                return <LoadingLens />;
              }
              if (!careerId && !!defaultCareerId) {
                return (
                  <Redirect to={`${urls.questions}/${defaultCareerId}/${defaultQuestionId}`} />
                );
              }
              if (!interviewId && !!careerId) {
                return <Redirect to={`${urls.questions}/${careerId}/${defaultQuestionId}`} />;
              }
              return <InterviewPage />;
            }}
          />
          <Route
            path={urls.settings}
            render={() => {
              if (unauthenticated) {
                return <Redirect to={urls.landingPage} />;
              }
              if (!authenticated) {
                return <LoadingLens />;
              }
              return <SettingsPage />;
            }}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
