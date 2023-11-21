import { Anchor } from '@mantine/core';
import React from 'react';
import { IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import { urls } from '@shared/config/urlConstants';

import styles from './pageFooter.module.scss';

export const PageFooter = () => {
  const x = {};
  return (
    <div className={styles.container}>
      <Anchor
        className={styles.anchor}
        underline="never"
        onClick={() => console.log('here')}
        size="lg"
      >
        Feedback
      </Anchor>
      <Anchor className={styles.anchor} href={urls.linkedIn} target="_blank" size="lg">
        <IconMail />
      </Anchor>
      <Anchor className={styles.anchor} href={urls.linkedIn} target="_blank" size="lg">
        <IconBrandLinkedin />
      </Anchor>
    </div>
  );
};
