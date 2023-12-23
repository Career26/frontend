import { Suspense } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { usePageSetup } from '@shared/hooks/usePageSetup';

import { LoadingLens } from '@shared/components/loadingScreen/LoadingLens';
import { FeedbackModal } from '@shared/components/feedback/FeedbackModal';
import CareerTest from '@features/careerTest';
import SettingsPage from '@features/settings';
import LandingPage from '@features/landingPage';
import OverviewPage from '@features/overview';
import QuestionsPage from '@features/questions';

import { CareerTestModal } from '@shared/components/careerTestModal/CareerTestModal';

import { urls } from '@shared/constants/urlConstants';

const Index = () => {
  const { loading, authenticated } = usePageSetup();
  const history = useHistory();

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
          render={() => {
            if (authenticated) {
              return <OverviewPage />;
            }
            history.push(urls.landingPage);
            return <LoadingLens />;
          }}
        />
        <Route
          path={urls.questions}
          render={() => {
            if (authenticated) {
              return <QuestionsPage />;
            }
            history.push(urls.landingPage);
            return <LoadingLens />;
          }}
        />
        <Route
          path={urls.settings}
          component={SettingsPage}
          render={() => {
            if (authenticated) {
              return <SettingsPage />;
            }
            history.push(urls.landingPage);
            return <LoadingLens />;
          }}
        />
      </Switch>
    </Suspense>
  );
};

export default Index;
