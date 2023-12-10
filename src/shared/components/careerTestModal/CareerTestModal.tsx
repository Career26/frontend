import { selectCareerTestModal, setCareerTestModal } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React from 'react';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { Container, Text } from '@mantine/core';

import { ActionModal } from '../actionModal/ActionModal';
import styles from './careerTestModal.module.scss';

const NoProfileBody = () => (
  <Container py="md" className={styles.container}>
    <Text py="md">
      We provide personalised career guidance based on your Career26 test results.
    </Text>
    <Text py="md" fw="bold">
      Take the Career26 Test now, it takes less than 5 minutes!
    </Text>
  </Container>
);

const TimeTakenBody = () => (
  <Container py="md" className={styles.container}>
    <Text py="md">This test takes less than 5 minutes.</Text>
    <Text py="md" fw="bold">
      The more detail you provide, the more accurate the results will be.
    </Text>
  </Container>
);

export const CareerTestModal = () => {
  const dispatch = useAppDispatch();
  const { open, noProfile } = useAppSelector(selectCareerTestModal);
  const { clickCareersTest } = usePageNavigation();

  const onClose = () => {
    dispatch(setCareerTestModal({ open: false }));
  };

  const onClick = () => {
    clickCareersTest();
    onClose();
  };

  const Body = noProfile ? NoProfileBody : TimeTakenBody;

  return (
    <ActionModal
      title="Build your Career Profile"
      opened={open}
      onClose={onClose}
      label="Take the Test Now!"
      onClick={onClick}
      body={<Body />}
    />
  );
};
