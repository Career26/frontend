import { Loader } from '@mantine/core';

import { TypeWriter } from './TypeWriter';

import styles from './loadingScreen.module.css';

interface LoaderWithTextProps {
  text: string[];
}

export const LoaderWithText = ({ text }: LoaderWithTextProps) => (
  <div className={styles.container}>
    <div className={styles.typeWriter}>
      <TypeWriter repeatSequence text={text} />
    </div>
    <div className={styles.loader}>
      <Loader type="dots" size="xl" />
    </div>
  </div>
);
