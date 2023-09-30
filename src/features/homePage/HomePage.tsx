import { Container, Grid, Group, Paper, Text, Tooltip, createStyles, rem } from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Shell } from '@shared/components/shell/Shell';
import { HEADER_HEIGHT } from '@shared/styles/headerStyles';
import classNames from 'classnames';
import { featureTiles } from '@shared/config/featureConstants';
import { commonStyles } from '@shared/styles/commonStyles';

const homePageStyles = createStyles((theme) => ({
  container: {
    paddingTop: `calc(${HEADER_HEIGHT} + ${rem(40)})`,
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    alignItems: 'center',
  },
  navItem: {
    paddingTop: rem(10),
  },
  disabled: {
    '&:hover': {
      cursor: 'not-allowed',
    },
  },
  description: {
    color: theme.colors.gray[9],
    fontSize: rem(18),
  },
}));

export const HomePage = () => {
  const { classes } = homePageStyles();
  const { classes: commonClasses } = commonStyles();
  const history = useHistory();
  return (
    <Shell>
      <div className={classes.container}>
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
                <Grid.Col md={6}>
                  <Paper
                    onClick={() => !disabled && history.push(link)}
                    shadow="sm"
                    radius="lg"
                    withBorder
                    className={classNames(commonClasses.hoverItem, classes.navItem, {
                      [classes.disabled]: disabled,
                    })}
                  >
                    <Group>
                      <Icon size={80} />
                      <Text size="lg" weight="bold" p="md">
                        {title}
                      </Text>
                    </Group>
                    <Text size="sm" color="dimmed" p="sm" className={classes.description}>
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
