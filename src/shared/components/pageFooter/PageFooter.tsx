import { Anchor } from '@mantine/core';
import React from 'react';
import { IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import { contactEmail, urls } from '@shared/config/urlConstants';
import { useAppDispatch } from '@state/store';
import { setFeedbackModal } from '@slices/sessionSlice';

import styles from './pageFooter.module.scss';

const subject = 'Career26 - Contact Us';
const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;

export const PageFooter = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <Anchor
        className={styles.anchor}
        underline="never"
        onClick={() => dispatch(setFeedbackModal({ open: true }))}
        size="lg"
      >
        Feedback
      </Anchor>
      <Anchor
        className={styles.anchor}
        target="_blank"
        size="lg"
        onClick={() => window.open(mailtoLink)}
      >
        <IconMail />
      </Anchor>
      <Anchor className={styles.anchor} href={urls.linkedIn} target="_blank" size="lg">
        <IconBrandLinkedin />
      </Anchor>
    </div>
  );
};
