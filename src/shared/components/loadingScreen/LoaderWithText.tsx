import { Loader } from '@mantine/core';

import { TypeWriter } from './TypeWriter';

import styles from './loadingScreen.module.css';

export const LoaderWithText = ({ text }: { text: string[] }) => (
  <div className={styles.container}>
    <div className={styles.typeWriter}>
      <TypeWriter repeatSequence text={text} />
    </div>
    <div className={styles.loader}>
      <Loader type="dots" size="xl" />
    </div>
  </div>
);
