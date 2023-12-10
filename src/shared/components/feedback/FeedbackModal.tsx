import { Group, Text } from '@mantine/core';
import { selectFeedbackModal, setFeedbackModal } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Feedback } from '@datatypes/feedback';
import { useSubmitFeedbackMutation } from '@apis/feedbackApi';
import { IconCircleCheck } from '@tabler/icons-react';

import { FeedbackForm } from './FeedbackForm';
import { ActionModal } from '../actionModal/ActionModal';

const hasAnswer = (value?: string | string[]) => !value?.length && 'Please provide an answer';

export const FeedbackModal = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(selectFeedbackModal);

  const [submitFeedback, { isLoading, data, reset }] = useSubmitFeedbackMutation();

  const form = useForm<Feedback>({
    initialValues: {
      heardFrom: [],
      mostHelpful: [],
      experienceRating: '',
    },
    validate: {
      heardFrom: hasAnswer,
      mostHelpful: hasAnswer,
      experienceRating: hasAnswer,
      otherFunctions: (value) => {
        if (!value || value.length <= 500) {
          return undefined;
        }
        return 'Feedback must be 500 characters or less';
      },
    },
  });

  const onClose = () => {
    dispatch(setFeedbackModal({ open: false }));
    reset();
    form.reset();
  };

  useEffect(() => {
    if (data) {
      setTimeout(onClose, 2000);
    }
  }, [data]);

  const body = data ? (
    <Group py="md">
      <IconCircleCheck color="green" size={50} />
      <Text>Thank you for providing feedback!</Text>
    </Group>
  ) : (
    <FeedbackForm form={form} />
  );

  return (
    <ActionModal
      label="Submit"
      title="Feedback"
      opened={open}
      onClose={onClose}
      body={body}
      disabled={!!Object.values(form.errors).length}
      loading={isLoading}
      onClick={() => submitFeedback(form.values)}
    />
  );
};
