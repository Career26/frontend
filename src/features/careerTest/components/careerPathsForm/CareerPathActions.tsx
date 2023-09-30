import { ActionIcon } from '@mantine/core';
import {
  IconCircleCheck,
  IconSquareRoundedMinusFilled,
  IconSquareRoundedPlusFilled,
} from '@tabler/icons-react';
import React from 'react';

type CareerPathActionsProps = {
  loading?: boolean;
  selected?: boolean;
  onClickAction?: () => void;
};

export const CareerPathActions = ({ onClickAction, selected, loading }: CareerPathActionsProps) => (
  <div>
    {selected && <IconCircleCheck size={30} fill="green" color="white" />}
    <ActionIcon loading={loading} onClick={onClickAction} color={selected ? 'red' : 'gray'}>
      {selected ? <IconSquareRoundedMinusFilled /> : <IconSquareRoundedPlusFilled />}
    </ActionIcon>
  </div>
);
