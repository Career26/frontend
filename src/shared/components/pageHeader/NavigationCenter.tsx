import React, { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Grid, Paper, createStyles, rem, Container, Avatar } from '@mantine/core';
import { IconLayoutDashboard } from '@tabler/icons-react';
import { useHistory } from 'react-router-dom';
import { featureTiles } from '@shared/config/featureConstants';
import classNames from 'classnames';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { commonStyles } from '@shared/styles/commonStyles';

const navigationStyles = createStyles((theme) => ({
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  modalContainer: {
    '.mantine-Modal-header': {
      display: 'flex',
      justifyContent: 'center',
      borderBottom: '1px solid black',
    },
    '.mantine-Modal-title': {
      fontSize: rem(20),
      fontWeight: 'bold',
    },
    '.mantine-Modal-body': {
      paddingTop: `${rem(25)} !important`,
      backgroundColor: theme.colors.gray[3],
      paddingBottom: rem(25),
    },
    '.mantine-Modal-overlay': {
      opacity: 0.55,
    },
  },
  disabled: {
    '&:hover': {
      cursor: 'not-allowed',
    },
  },
}));

export const NavigationCenter = () => {
  const { classes } = navigationStyles();
  const { classes: commonClasses } = commonStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const history = useHistory();

  const { currentPathname } = usePageNavigation();

  useEffect(() => {
    close();
  }, [currentPathname]);

  return (
    <>
      <Avatar color="blue" radius="xl" onClick={open} className={commonClasses.hoverIcon}>
        <IconLayoutDashboard />
      </Avatar>
      <Modal
        opened={opened}
        onClose={close}
        title="Navigation Center"
        centered
        withCloseButton={false}
        size="md"
        radius={20}
        overlayProps={{ blur: 3 }}
        className={classes.modalContainer}
      >
        <Container>
          <Grid gutter={20} justify="center">
            {featureTiles.map(({ title, Icon, disabled, link }) => (
              <Grid.Col key={title} md={6}>
                <Paper
                  onClick={() => !disabled && history.push(link)}
                  shadow="sm"
                  radius="lg"
                  withBorder
                  className={classNames(commonClasses.hoverItem, { [classes.disabled]: disabled })}
                >
                  <Icon size={80} />
                  {title}
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Modal>
    </>
  );
};
