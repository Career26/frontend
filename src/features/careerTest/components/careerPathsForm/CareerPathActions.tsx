import { IconMinus, IconPlus } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import React from 'react';

type CareerPathActionsProps = {
  loading?: boolean;
  selected?: boolean;
  onClickAction?: () => void;
};

export const CareerPathActions = ({ onClickAction, selected, loading }: CareerPathActionsProps) => {
  if (selected) {
    return (
      <Button
        onClick={onClickAction}
        variant="outline"
        loading={loading}
        size="xs"
        color="red"
        leftSection={<IconMinus />}
      >
        Remove
      </Button>
    );
  }
  return (
    <Button
      onClick={onClickAction}
      variant="outline"
      loading={loading}
      size="xs"
      leftSection={<IconPlus />}
    >
      Select
    </Button>
  );
};
