import { useState } from 'react';
import { UseFormReturnType } from '@mantine/form';

import { FeedbackValues } from './feedbackTypes';

export const useFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<boolean>();
  const submitFeedback = ({
    form,
    callback,
  }: {
    form: UseFormReturnType<FeedbackValues>;
    callback: () => void;
  }) => {
    const { errors } = form.validate();
    if (Object.values(errors).length) {
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setData(true);
      setTimeout(() => {
        callback();
      }, 3000);
    }, 5000);
  };

  return { submitFeedback, loading, data };
};
