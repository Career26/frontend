import React from 'react';
import { Button, Group } from '@mantine/core';
import { IconMinus } from '@tabler/icons-react';

export const RemoveRowButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <Group py="sm">
    <Button leftSection={<IconMinus />} color="red" onClick={onClick}>
      Remove {label}
    </Button>
  </Group>
);
