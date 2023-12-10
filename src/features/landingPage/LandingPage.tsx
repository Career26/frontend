import React from 'react';
import { Shell } from '@shared/components/shell/Shell';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import classNames from 'classnames';

import styles from './landingPageStyles.module.scss';
import { FeatureSlider } from './featureSlider/FeatureSlider';
import { HomeTiles } from './homeTiles/HomeTiles';

export const LandingPage = () => {
  const { authenticated } = useAuthUser();
  return (
    <Shell>
      <div className={classNames({ [styles.container]: !authenticated })}>
        {!authenticated && <FeatureSlider />}
        <HomeTiles />
      </div>
    </Shell>
  );
};
