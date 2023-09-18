import { Card, Container, Grid, Group, Text, Tooltip, createStyles, rem } from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Shell } from '@shared/components/shell/Shell';
import { HEADER_HEIGHT } from '@shared/components/pageHeader/pageHeaderStyles';
import classNames from 'classnames';

import { FeatureTile, featureTiles } from './homePageConstants';

const homePageStyles = createStyles((theme) => ({
  container: {
    paddingTop: `calc(${HEADER_HEIGHT} + ${rem(10)})`,
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    alignItems: 'center',
  },
  cardHeader: {
    background: theme.colors.blue[0],
    alignItems: 'center',
    height: '50px',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  title: {
    fontSize: rem(20),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
    textAlign: 'center',
    [theme.fn.smallerThan('lg')]: {
      textAlign: 'left',
      paddingBottom: theme.spacing.xs,
    },
  },
  cardContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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

const HomePageTile = ({ link, disabled, title, description, Icon }: FeatureTile) => {
  const { classes } = homePageStyles();
  const history = useHistory();
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={classNames(classes.cardContainer, { [classes.disabled]: disabled })}
      onClick={() => !disabled && history.push(link)}
    >
      <Card.Section withBorder className={classes.cardHeader} inheritPadding>
        <Group position="apart">
          <Text weight={500} className={classes.title}>
            {title}
          </Text>
          <Icon />
        </Group>
      </Card.Section>
      <Text size="sm" color="dimmed" p="md" className={classes.description}>
        {description}
      </Text>
    </Card>
  );
};
export const HomePage = () => {
  const { classes } = homePageStyles();
  return (
    <Shell>
      <div className={classes.container}>
        <Container>
          <Grid gutter={50} justify="center">
            {featureTiles.map((feature) => (
              <Tooltip
                label="Mentor network coming soon"
                position="right"
                openDelay={500}
                key={feature.title}
                disabled={!feature.disabled}
              >
                <Grid.Col md={6}>
                  <HomePageTile {...feature} />
                </Grid.Col>
              </Tooltip>
            ))}
          </Grid>
        </Container>
      </div>
    </Shell>
  );
};
