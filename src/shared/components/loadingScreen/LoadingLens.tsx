import React from 'react';
import logo from '@assets/logo.png';
import c26 from '@assets/career26.png';
import { Image, Loader } from '@mantine/core';

import styles from './loadingScreen.module.scss';

export const LoadingLens = () => (
  <div className={styles.lensContainer}>
    <div className={styles.logoContainer}>
      <Image src={logo} h={70} w="auto" fit="contain" className={styles.logo} />
      <Image src={c26} h={20} w="auto" fit="contain" className={styles.title} />
      <Loader type="dots" className={styles.dots} size="xl" />
    </div>
  </div>
);
