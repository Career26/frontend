import React from 'react';

// external
import { useHistory } from 'react-router-dom';
import { Card, Container, Text, createStyles, rem } from '@mantine/core';

// shared
import { PageHeader } from '@shared/components/pageHeader/PageHeader';

// config
import { urls } from '@shared/config/urlConstants';
import { Shell } from '@shared/components/shell/Shell';

const useStyles = createStyles((theme) => ({
  titleContainer: {
    paddingTop: rem(80),
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(60),
    },
  },

  testInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  card: {
    background: theme.colors.blue[0],
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing.xl,
    marginRight: theme.spacing.xl,
    width: '100%',

    [theme.fn.smallerThan('sm')]: {
      margin: 'auto',
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
}));

export const CareerTest = () => {
  const { classes } = useStyles();

  const history = useHistory();

  const takeTest = () => history.push(urls.careersTest);

  return (
    <Shell header={<PageHeader getStarted={takeTest} />}>
      <>
        <Container className={classes.titleContainer}>
          <Text className={classes.titleText}>Free Career Path Test</Text>
          <Container className={classes.testInfoContainer}>
            <Card className={classes.card}>
              <Text align="center" pb="xs">
                Complete The Test
              </Text>
              <Text align="center">
                Discover career paths suited to your personality by taking our test.
              </Text>
            </Card>

            <Card className={classes.card}>
              <Text align="center" pb="xs">
                View Your Paths
              </Text>
              <Text align="center">Take our career test and provide your information.</Text>
            </Card>

            <Card className={classes.card}>
              <Text align="center" pb="xs">
                Select Your Path
              </Text>
              <Text align="center">
                Select your path, practice interviews, refine your CV and connect with experts.
              </Text>
            </Card>
          </Container>
        </Container>
      </>
    </Shell>
  );
};
