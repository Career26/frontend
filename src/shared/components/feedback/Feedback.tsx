import { useForm } from '@mantine/form';
import React from 'react';
import { Button, Card, Group, Modal, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@state/store';
import { selectShowFeedback, setShowFeedback } from '@slices/sessionSlice';

import { FeedbackValues } from './feedbackTypes';
import { useFeedback } from './useFeedback';
import { FeedbackForm } from './FeedbackForm';

const hasAnswer = (value?: string | string[]) => !value?.length && 'Please provide an answer';

export const Feedback = () => {
  const dispatch = useAppDispatch();
  const opened = useAppSelector(selectShowFeedback);
  const onClose = () => {
    dispatch(setShowFeedback(false));
  };
  const { loading, data, submitFeedback } = useFeedback();
  const form = useForm<FeedbackValues>({
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

  return (
    <Modal opened={opened} onClose={onClose} size="xl" withCloseButton={false} centered>
      <Card>
        <Card.Section withBorder inheritPadding py="xs" bg="navy" c="white">
          <Group justify="center">
            <Text fw="bold" size="2rem">
              {data ? 'Thank You!' : 'Help us to Help You!'}
            </Text>
          </Group>
        </Card.Section>
        {!data ? (
          <>
            <FeedbackForm form={form} />
            <Group justify="flex-end" py="md">
              <Button
                onClick={() => submitFeedback({ form, callback: onClose })}
                loading={loading}
                disabled={!!Object.values(form.errors).length}
                variant="outline"
              >
                Submit
              </Button>
            </Group>
          </>
        ) : (
          <Group justify="center" py="md">
            <Text>Your feedback is important to us</Text>
          </Group>
        )}
      </Card>
    </Modal>
  );
};
