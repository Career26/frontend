import classNames from 'classnames';

import { usePageSetup } from '@shared/hooks/usePageSetup';

import { Shell } from '@shared/components/shell/Shell';
import { FeatureSlider } from '@shared/components/featureSlider/FeatureSlider';
import { HomeTiles } from '@landingPage/HomeTiles';
import { LoadingLens } from '@shared/components/loadingScreen/LoadingLens';

import { landingPageSlides } from '@shared/constants/landingPageConstants';

import styles from '@landingPage/landingPage.module.css';

const Index = () => {
  const { loading, authenticated } = usePageSetup();
  if (loading) {
    return <LoadingLens />;
  }
  return (
    <Shell>
      <div className={classNames({ [styles.container]: !authenticated })}>
        {!authenticated && <FeatureSlider slides={landingPageSlides} />}
        <HomeTiles />
      </div>
    </Shell>
  );
};

export default Index;
