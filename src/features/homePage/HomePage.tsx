import { Container, Grid, Group, Paper, Text, Tooltip } from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Shell } from '@shared/components/shell/Shell';
import { featureTiles } from '@shared/config/featureConstants';
import commonStyles from '@shared/styles/commonStyles.module.scss';
import classNames from 'classnames';
import { Feedback } from '@shared/components/feedback/Feedback';

import styles from './homePageStyles.module.scss';

export const HomePage = () => {
  const history = useHistory();

  return (
    <Shell>
      <>
        <Container className={styles.container}>
          <Grid>
            {featureTiles.map(({ title, Icon, link, description, disabled }) => (
              <Tooltip label={`${title} Coming Soon`} key={title} disabled={!disabled}>
                <Grid.Col>
                  <Paper
                    onClick={() => !disabled && history.push(link)}
                    withBorder
                    p="md"
                    h={150}
                    w="100%"
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
                    <Group className={styles.left}>
                      <Icon className={styles.icon} stroke={1} />
                    </Group>
                    <Group className={styles.right}>
                      <Text fw="bold" size="xl" ta="left">
                        {title}
                      </Text>
                      <Text>{description}</Text>
                    </Group>
                  </Paper>
                </Grid.Col>
              </Tooltip>
            ))}
          </Grid>
        </Container>
        <Feedback />
      </>
    </Shell>
  );
};
