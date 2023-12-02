import React, { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Grid, Paper, Container, Avatar, Text } from '@mantine/core';
import { IconLayoutDashboard } from '@tabler/icons-react';
import { useHistory } from 'react-router-dom';
import { featureTiles } from '@shared/config/featureConstants';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import classNames from 'classnames';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';

import styles from './headerStyles.module.scss';

export const NavigationCenter = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const history = useHistory();
  const { isMobile } = useMobileStyles();
  const { currentPathname } = usePageNavigation();

  useEffect(() => {
    close();
  }, [currentPathname]);

  return (
    <>
      <Avatar
        radius="xl"
        onClick={open}
        className={classNames(commonStyles.hoverItem, commonStyles.navyBg)}
        color="white"
        aria-label="navigation-center"
      >
        <IconLayoutDashboard />
      </Avatar>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="md"
        overlayProps={{ blur: 3 }}
        radius="lg"
      >
        <Container>
          <Grid py="sm">
            {featureTiles
              .filter(({ disabled }) => !disabled)
              .map(({ title, Icon, link }) => (
                <Grid.Col span={6} key={title} className={styles.navCenter}>
                  <Paper
                    onClick={() => history.push(link)}
                    withBorder
                    p="md"
                    h={150}
                    w="100%"
                    radius="xm"
                    display="flex"
                    className={classNames(
                      commonStyles.lightNavyBg,
                      commonStyles.hoverItem,
                      commonStyles.navTile,
                    )}
                  >
                    <div>
                      <Icon size={isMobile ? 70 : 100} />
                      <Text size="sm">{title}</Text>
                    </div>
                  </Paper>
                </Grid.Col>
              ))}
          </Grid>
        </Container>
      </Modal>
    </>
  );
};
