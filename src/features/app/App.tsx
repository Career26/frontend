import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { urls } from '@shared/config/urlConstants';
import { useAppDispatch, useAppSelector } from '@state/store';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import {
  addIndustryColors,
  selectLoginModal,
  selectSelectedCareerPathId,
  selectSelectedQuestionId,
} from '@slices/sessionSlice';
import {
  selectCareerPaths,
  selectProfileId,
  selectProfileState,
  useLazyGetProfileQuery,
} from '@apis/profileApi';
import { SettingsPage } from '@features/settings/SettingsPage';
import { LoadingLens } from '@shared/components/loadingScreen/LoadingLens';
import { useCareerTestStorage } from '@shared/hooks/useCareerTestStorage';
import { FeedbackModal } from '@shared/components/feedback/FeedbackModal';
import { CareerTest } from '@careerTest/CareerTest';
import { Mentors } from '@features/mentors/Mentors';
import { CareerTestModal } from '@shared/components/careerTestModal/CareerTestModal';
import { DiversityModal } from '@shared/components/diverstiyModal/DiversityModal';

import { LandingPage } from '../landingPage/LandingPage';
import { OverviewPage } from '../overview/OverviewPage';
import { InterviewPage } from '../interview/InterviewPage';

export const App = () => {
  const dispatch = useAppDispatch();
  const defaultCareerId = useAppSelector(selectSelectedCareerPathId);
  const defaultQuestionId = useAppSelector(selectSelectedQuestionId);
  const { authenticated, unauthenticated } = useAuthUser();
  const careerPaths = useAppSelector(selectCareerPaths);
  const profileId = useAppSelector(selectProfileId);
  const profile = useAppSelector(selectProfileState);
  const [getProfile, { isFetching }] = useLazyGetProfileQuery();
  const { setupFormValues } = useCareerTestStorage();
  const { open: loginOpen } = useAppSelector(selectLoginModal);

  useEffect(() => {
    if (!careerPaths || !profile) {
      return;
    }
    const industries = Object.values(careerPaths).map(({ industry }) => industry);
    dispatch(addIndustryColors(industries));
    setupFormValues(profile);
  }, [careerPaths, profile]);

  useEffect(() => {
    if (authenticated && !profileId && !loginOpen) {
      getProfile();
    }
  }, [authenticated, profileId, loginOpen]);

  if (isFetching) {
    return <LoadingLens />;
  }

  return (
    <Suspense fallback={<LoadingLens />}>
      <FeedbackModal />
      <CareerTestModal />
      <DiversityModal />
      <Switch>
        <Route path={urls.landingPage} exact component={LandingPage} />
        <Route path={urls.careersTest} component={CareerTest} />
        <Route path={urls.mentors} component={Mentors} />
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
            if (authenticated && !profileId) {
              return <LandingPage />;
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
            if (authenticated && !profileId) {
              return <LandingPage />;
            }
            if (!careerId && !!defaultCareerId) {
              return <Redirect to={`${urls.questions}/${defaultCareerId}/${defaultQuestionId}`} />;
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
  );
};
