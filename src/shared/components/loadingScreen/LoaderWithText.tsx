import { Loader } from '@mantine/core';
import { TypeWriter } from '@shared/components/loadingScreen/TypeWriter';
import React from 'react';

import styles from './loadingScreen.module.scss';
import { LoadingScreenText } from './loadingTypes';

export const LoaderWithText = ({ text }: { text: LoadingScreenText[] }) => (
  <div className={styles.container}>
    <div className={styles.typeWriter}>
      <TypeWriter repeatSequence text={text} />
    </div>
    <div className={styles.loader}>
      <Loader type="dots" size="xl" />
    </div>
  </div>
);
