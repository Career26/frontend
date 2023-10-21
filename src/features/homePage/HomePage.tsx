import { Container, Grid, Group, Paper, Text, Tooltip } from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Shell } from '@shared/components/shell/Shell';
import classNames from 'classnames';
import { featureTiles } from '@shared/config/featureConstants';
import { commonStyles } from '@shared/styles/commonStyles';

import styles from './homePageStyles.module.scss';

export const HomePage = () => {
  const { classes: commonClasses } = commonStyles();
  const history = useHistory();

  return (
    <Shell>
      <div className={styles.container}>
        <Container>
          <Grid gutter={50} justify="center">
            {featureTiles.map(({ title, Icon, link, description, disabled }) => (
              <Tooltip
                label="Mentor network coming soon"
                position="right"
                openDelay={500}
                key={title}
                disabled={!disabled}
              >
                <Grid.Col span={{ md: 6 }}>
                  <Paper
                    onClick={() => !disabled && history.push(link)}
                    shadow="sm"
                    radius="lg"
                    withBorder
                    className={classNames(commonClasses.hoverItem, styles.navItem, {
                      [styles.disabled]: disabled,
                    })}
                  >
                    <Group>
                      <Icon size={80} />
                      <Text size="lg" fw={800} p="md">
                        {title}
                      </Text>
                    </Group>
                    <Text size="sm" color="dimmed" p="sm" className={styles.description}>
                      {description}
                    </Text>
                  </Paper>
                </Grid.Col>
              </Tooltip>
            ))}
          </Grid>
        </Container>
      </div>
    </Shell>
  );
};
