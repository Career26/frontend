import { Suspense } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { usePageSetup } from '@shared/hooks/usePageSetup';

import { LoadingLens } from '@shared/components/loadingScreen/LoadingLens';
import { FeedbackModal } from '@shared/components/feedback/FeedbackModal';
import CareerTest from '@features/careerTest';
import SettingsPage from '@features/settings';
import LandingPage from '@features/landingPage';
import OverviewPage from '@features/overview';
import QuestionsPage from '@features/questions';
import NetworkPage from '@features/network';
import { CareerTestModal } from '@shared/components/careerTestModal/CareerTestModal';

import { urls } from '@shared/constants/urlConstants';

interface AuthenticatedComponentProps {
  authenticated: boolean;
  Component: () => JSX.Element | null;
}

const AuthenticatedComponent = ({ authenticated, Component }: AuthenticatedComponentProps) => {
  const history = useHistory();
  if (authenticated) {
    return <Component />;
  }
  history.push(urls.landingPage);
  return <LoadingLens />;
};

const Index = () => {
  const { loading, authenticated } = usePageSetup();

  if (loading) {
    return <LoadingLens />;
  }

  return (
    <Suspense fallback={<LoadingLens />}>
      <FeedbackModal />
      <CareerTestModal />
      <Switch>
        <Route path={urls.landingPage} exact component={LandingPage} />
        <Route path={urls.careersTest} component={CareerTest} />
        <Route
          path={urls.overview}
          render={() => (
            <AuthenticatedComponent authenticated={authenticated} Component={OverviewPage} />
          )}
        />
        <Route
          path={urls.questions}
          render={() => (
            <AuthenticatedComponent authenticated={authenticated} Component={QuestionsPage} />
          )}
        />
        <Route
          path={urls.settings}
          render={() => (
            <AuthenticatedComponent authenticated={authenticated} Component={SettingsPage} />
          )}
        />
        <Route
          path={urls.network}
          render={() => (
            <AuthenticatedComponent authenticated={authenticated} Component={NetworkPage} />
          )}
        />
        <Redirect to={urls.landingPage} />
      </Switch>
    </Suspense>
  );
};

export default Index;
