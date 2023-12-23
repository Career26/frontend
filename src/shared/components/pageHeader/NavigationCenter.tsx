import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Grid, Paper, Container, Avatar, Text } from '@mantine/core';
import { IconLayoutDashboard } from '@tabler/icons-react';
import classNames from 'classnames';

import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';

import { featureTiles } from '@shared/constants/featureConstants';

import commonStyles from '@shared/styles/commonStyles.module.css';
import styles from './pageHeader.module.css';

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
            {featureTiles.map(({ title, Icon, disabled, link }) => (
              <Grid.Col span={6} key={title} className={styles.navCenter}>
                <Paper
                  onClick={() => !disabled && history.push(link)}
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
                    {
                      [commonStyles.disabled]: disabled,
                    },
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
