import React from 'react';

// external
import { useHistory } from 'react-router-dom';
import { Card, Container, Image, Text, createStyles, rem } from '@mantine/core';

// shared
import { PageHeader } from '@shared/components/pageHeader/PageHeader';

// config
import { urls } from '@shared/config/urlConstants';
import { Shell } from '@shared/components/shell/Shell';

import analyseImg from './assets/analyse.svg';
import { Tile } from './components/tile';

const useStyles = createStyles((theme) => ({
  titleContainer: {
    paddingTop: rem(80),
    paddingBottom: theme.spacing.xl,
  },

  testInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  card: {
    background: theme.colors.blue[0],
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    width: 'calc(33.33333%)',

    [theme.fn.smallerThan('sm')]: {
      margin: 'auto',
      marginBottom: theme.spacing.xl,
    },
  },

  titleText: {
    fontSize: rem(36),
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colors.gray[9],
    textAlign: 'center',
  },

  cardTitle: {
    paddingBottom: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    fontSize: rem(18),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
  },

  cardDescription: {
    paddingBottom: theme.spacing.md,
    fontSize: rem(15),
  },
}));

export const CareerTest = () => {
  const { classes } = useStyles();

  const history = useHistory();

  const takeTest = () => history.push(urls.careersTest);

  const tileContent = [
    { title: 'Complete the Test', description: 'Take our career path test', image: analyseImg },
    { title: 'Explore Your Paths', description: 'Take our career path test', image: analyseImg },
    { title: 'Unlock Your Potential', description: 'Take our career path test', image: analyseImg },
  ];

  return (
    <Shell header={<PageHeader getStarted={takeTest} />}>
      <>
        <Container className={classes.titleContainer}>
          <Text className={classes.titleText}>Free Career Path Test</Text>
          <Container className={classes.testInfoContainer}>
            {tileContent.map((item) => (
              <Tile title={item.title} description={item.description} image={item.image} />
            ))}
          </Container>
        </Container>
      </>
    </Shell>
  );
};
