import { Button, Group } from '@mantine/core';
import { IconMinus } from '@tabler/icons-react';

interface RemoveRowButtonProps {
  label: string;
  onClick: () => void;
}

export const RemoveRowButton = ({ label, onClick }: RemoveRowButtonProps) => (
  <Group py="sm">
    <Button leftSection={<IconMinus />} color="red" onClick={onClick}>
      Remove {label}
    </Button>
  </Group>
);
