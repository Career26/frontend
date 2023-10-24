import { Loader } from '@mantine/core';
import { TypeWriter } from '@shared/components/loadingScreen/TypeWriter';
import React from 'react';

import styles from './careerTestStyles.module.scss';

export const CareerLoader = () => (
  <>
    <div className={styles.typeWriter}>
      <TypeWriter
        repeatSequence
        text={[
          {
            text: 'Generating your personalised career suggestions...',
            textDelay: 40,
            repeatDelay: 1000,
            deleteDelay: 2000,
          },
          {
            text: 'This may take up to 30 seconds...',
            textDelay: 40,
            repeatDelay: 1000,
            deleteDelay: 2000,
          },
          {
            text: "You're almost there...",
            textDelay: 40,
            repeatDelay: 1000,
            deleteDelay: 2000,
          },
        ]}
      />
    </div>
    <div className={styles.loader}>
      <Loader type="dots" size="xl" />
    </div>
  </>
);
