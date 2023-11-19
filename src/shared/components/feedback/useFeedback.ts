import { useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { Feedback } from '@datatypes/feedback';

// TODO: BE needs endpoint

export const useFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<boolean>();
  const submitFeedback = ({
    form,
    callback,
  }: {
    form: UseFormReturnType<Feedback>;
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
      }, 1000);
    }, 5000);
  };

  return { submitFeedback, loading, data };
};
