import { selectDiversityModal, setDiversityModal } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React from 'react';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { DiversityContent } from '@careerTest/components/diversityForm/DiversityContent';
import { useProfileForm } from '@careerTest/hooks/useProfileForm';
import { CareerStep } from '@careerTest/careerTestTypes';

import { ActionModal } from '../actionModal/ActionModal';

const Body = () => {
  const { form } = useProfileForm({ activeStep: CareerStep.CAREER_PATHS });
  return <DiversityContent form={form} />;
};

export const DiversityModal = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(selectDiversityModal);
  const { goToMentors } = usePageNavigation();
  const onClose = () => {
    dispatch(setDiversityModal({ open: false }));
  };

  const onClick = () => {
    // update profile
    goToMentors();
    onClose();
  };

  return (
    <ActionModal
      title="Please Update your Diversity Profile"
      opened={open}
      onClose={onClose}
      label="Submit"
      onClick={onClick}
      body={<Body />}
    />
  );
};
