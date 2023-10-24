import React, { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Grid, Paper, Container, Avatar, Group, Text } from '@mantine/core';
import { IconLayoutDashboard } from '@tabler/icons-react';
import { useHistory } from 'react-router-dom';
import { featureTiles } from '@shared/config/featureConstants';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import classNames from 'classnames';

export const NavigationCenter = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const history = useHistory();

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
      >
        <IconLayoutDashboard />
      </Avatar>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="md"
        radius={20}
        overlayProps={{ blur: 3 }}
      >
        <Container>
          <Grid justify="center">
            {featureTiles.map(({ title, Icon, disabled, link }) => (
              <Grid.Col key={title}>
                <Paper
                  onClick={() => !disabled && history.push(link)}
                  withBorder
                  radius="xl"
                  p="md"
                  h={150}
                  w="100%"
                  display="flex"
                  className={commonStyles.hoverItem}
                >
                  <Group display="flex" align="center" justify="space-between">
                    <Icon size={100} />
                    <Text>{title}</Text>
                  </Group>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Modal>
    </>
  );
};
