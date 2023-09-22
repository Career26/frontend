import React, { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Grid, ActionIcon, Paper, createStyles, rem, Container } from '@mantine/core';
import { IconLayoutDashboard } from '@tabler/icons-react';
import { useHistory } from 'react-router-dom';
import { featureTiles } from '@shared/config/featureConstants';
import classNames from 'classnames';
import useCareerNavigation from '@shared/hooks/useCareerNavigation';

const navigationStyles = createStyles((theme) => ({
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: rem(15),
    '&:hover': {
      boxShadow: '0 3px 10px rgba(0,0,0,.2)',
      transform: 'translate3d(0,-2px,0)',
      cursor: 'pointer',
    },
  },
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
      paddingTop: rem(20),
      backgroundColor: theme.colors.gray[3],
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
  const [opened, { open, close }] = useDisclosure(false);
  const history = useHistory();

  const { currentPathname } = useCareerNavigation();

  useEffect(() => {
    close();
  }, [currentPathname]);

  return (
    <>
      <ActionIcon>
        <IconLayoutDashboard onClick={open} />
      </ActionIcon>
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
                  className={classNames(classes.navItem, { [classes.disabled]: disabled })}
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
