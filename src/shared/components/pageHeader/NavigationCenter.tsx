import React, { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Grid, Paper, Container, Avatar } from '@mantine/core';
import { IconLayoutDashboard } from '@tabler/icons-react';
import { useHistory } from 'react-router-dom';
import { featureTiles } from '@shared/config/featureConstants';
import classNames from 'classnames';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import commonStyles from '@shared/styles/commonStyles.module.scss';

import styles from './pageHeaderStyles.module.scss';

export const NavigationCenter = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const history = useHistory();

  const { currentPathname } = usePageNavigation();

  useEffect(() => {
    close();
  }, [currentPathname]);

  return (
    <>
      <Avatar color="blue" radius="xl" onClick={open} className={commonStyles.hoverIcon}>
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
        className={styles.modalContainer}
      >
        <Container>
          <Grid gutter={20} justify="center">
            {featureTiles.map(({ title, Icon, disabled, link }) => (
              <Grid.Col key={title} span={{ md: 6 }}>
                <Paper
                  onClick={() => !disabled && history.push(link)}
                  shadow="sm"
                  radius="lg"
                  withBorder
                  className={classNames(commonStyles.hoverItem, { [styles.disabled]: disabled })}
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
