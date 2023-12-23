import { Button, Group, Modal } from '@mantine/core';
import React from 'react';

import styles from './actionModal.module.css';

interface ActionModalProps {
  opened: boolean;
  onClose: () => void;
  body: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
  label: string;
  title: string;
}

export const ActionModal = ({
  opened,
  onClick,
  onClose,
  disabled,
  body,
  loading,
  label,
  title,
}: ActionModalProps) => (
  <Modal.Root opened={opened} onClose={onClose} size="xl" centered>
    <Modal.Overlay />
    <Modal.Content>
      <Modal.Header bg="navy" c="white">
        <Modal.Title fw="bold">{title}</Modal.Title>
        <Modal.CloseButton c="white" />
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Group justify="center" py="md" className={styles.footer}>
        <Button disabled={disabled} loading={loading} onClick={onClick} variant="outline">
          {label}
        </Button>
      </Group>
    </Modal.Content>
  </Modal.Root>
);
