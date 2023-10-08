import { Button, Container, Group, Modal, Text, createStyles, rem } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { resetInterviews } from '@slices/interviewSlice';
import {
  resetSession,
  selectDeleteAccountModal,
  setDeleteAccountModal,
} from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React from 'react';

const deleteAccountStyles = createStyles({
  buttons: {
    marginTop: rem(20),
  },
});

export const DeleteAccountModal = () => {
  const { classes } = deleteAccountStyles();
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(selectDeleteAccountModal);
  const { goToHomepage } = usePageNavigation();
  const onClose = () => {
    dispatch(setDeleteAccountModal({ open: false }));
  };
  const onDelete = () => {
    onClose();
    goToHomepage();
    dispatch(resetInterviews());
    dispatch(resetSession());
  };
  return (
    <Modal opened={open} title={<Text fw="bold">Delete Account</Text>} onClose={onClose} centered>
      <Container>
        <Text>Are you sure you want to delete your account?</Text>
        <Text>This will remove your saved careers, interview quesitons, and mentor network.</Text>
      </Container>
      <Group position="apart" className={classes.buttons}>
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button onClick={onDelete} color="red">
          Delete Account
        </Button>
      </Group>
    </Modal>
  );
};
