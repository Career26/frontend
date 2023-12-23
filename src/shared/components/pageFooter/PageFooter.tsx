import { Anchor, Text } from '@mantine/core';
import { IconBrandLinkedin, IconMail } from '@tabler/icons-react';

import { useAppDispatch } from '@state/store';
import { setFeedbackModal } from '@slices/sessionSlice';

import { contactEmail, urls } from '@shared/constants/urlConstants';

import styles from './pageFooter.module.css';

const subject = 'Career26 - Contact Us';
const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;

export const PageFooter = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <Text w="50%" c="navy" className={styles.copyright}>
        ©2023 Career26 Ltd
      </Text>
      <div className={styles.right}>
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
    </div>
  );
};
