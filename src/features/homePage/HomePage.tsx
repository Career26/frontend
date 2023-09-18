import { Container, Grid, Group, Paper, Text, Tooltip, createStyles, rem } from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Shell } from '@shared/components/shell/Shell';
import { HEADER_HEIGHT } from '@shared/components/pageHeader/pageHeaderStyles';
import classNames from 'classnames';
import { featureTiles } from '@shared/config/featureConstants';

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
                    className={classNames(classes.navItem, { [classes.disabled]: disabled })}
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
