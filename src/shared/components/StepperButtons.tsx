import { Button, Group } from '@mantine/core';
import React from 'react';

type StepperButtonProps = {
  loading?: boolean;
  clickNext: () => void;
  clickBack: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  backDisabled?: boolean;
};

export const StepperButtons = ({
  loading = false,
  clickNext,
  clickBack,
  nextLabel = 'Next',
  backLabel = 'Back',
  nextDisabled = false,
  backDisabled = false,
}: StepperButtonProps) => (
  <Group position="apart" mt="xl">
    <Button variant="default" onClick={clickBack} disabled={backDisabled || loading}>
      {backLabel}
    </Button>
    <Button onClick={clickNext} disabled={nextDisabled || loading}>
      {nextLabel}
    </Button>
  </Group>
);
