import React from 'react';
import { createStyles, Container, Text, Button, Group, rem, Image, Title } from '@mantine/core';
import careerProgressImg from './assets/careerProgress.svg';
import cvImg from './assets/cv.svg';
import careerPathsImg from './assets/careerPaths.svg';
import interviewImg from './assets/interview.svg';
import { useHistory } from 'react-router-dom';
import { urls } from '@shared/config/urlConstants';

const useStyles = createStyles((theme) => ({
  main: {
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 'none',
  },

  inner: {
    paddingTop: rem(110),
    paddingBottom: rem(110),
    display: 'flex',
    flexDirection: 'row',
    flex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
      flexDirection: 'column-reverse',
    },
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.black,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
      marginTop: theme.spacing.xl,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(22),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  image: {
    flex: 1,
    alignSelf: 'center',
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      flex: 1,
    },
  },

  featuresMain: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    background: theme.colors.gray[0],
    padding: 0,
    maxWidth: 'none',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  featureContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 0,
    paddingTop: `calc(${theme.spacing.xl} * 1.5)`,
    paddingBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
  featureTextContainer: {
    flex: 3,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  featureTitle: {
    paddingBottom: theme.spacing.md,
    fontSize: rem(25),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.black,
  },
  featureDescription: {
    paddingBottom: theme.spacing.md,
    fontSize: rem(18),
    color: theme.colors.gray[7],
  },
  featureImage: {
    flex: 1.2,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,
    paddingRight: `calc(${theme.spacing.xl} * 2)`,
  },
}));

export const LandingPage = () => {
  const { classes } = useStyles();
  const history = useHistory();

  return (
    <Container className={classes.main}>
      <Container className={classes.inner}>
        <Container className={classes.titleContainer}>
          <Title className={classes.title}>
            Discover your{' '}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              inherit
            >
              perfect career
            </Text>
          </Title>
          <Text className={classes.description} color="dimmed">
            Reveal your perfect career path, ace interviews and elevate your CV with our all-in-one
            career advisory platform
          </Text>
          <Group className={classes.controls}>
            <Button
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              onClick={() => history.push(urls.careersTest)}
            >
              Start Your Journey Now
            </Button>
          </Group>
        </Container>

        <Image src={careerProgressImg} className={classes.image} />
      </Container>

      <Container className={classes.featuresMain}>
        <Container>
          {[
            {
              image: careerPathsImg,
              title: 'Discover Your Ideal Career Path',
              description:
                'Find the career path that aligns with your aspirations and strengths. Our suggestions empower you to make informed decisions about your future. Take a short questionnaire where we delve into your interests, values, and skills to deliver tailored recommendations. Navigate confidently toward your dream career with our expert guidance.',
            },
            {
              image: interviewImg,
              title: 'Ace Interviews with Confidence',
              description:
                "Step into your interviews with confidence. Our expertly crafted mock interview questions prepare you for any scenario. Practicing with our extensive range of interview simulations, you'll gain the expertise needed to impress employers and be well-equipped to excel in even the most challenging interviews.",
            },
            {
              image: cvImg,
              title: 'Shine on Your CV',
              description:
                'Your CV is your introduction to employers. Let it shine brightly. Our CV enhancement service elevates your CV to stand out in a competitive job market. We craft a CV that highlights your strengths, experiences, and achievements in a compelling manner. Unlock opportunities and leave a lasting impression with a professionally tailored CV that showcases your true potential.',
            },
          ].map((item) => (
            <Container className={classes.featureContainer}>
              <Container className={classes.featureTextContainer}>
                <Text className={classes.featureTitle}>{item.title}</Text>
                <Text className={classes.featureDescription}>{item.description}</Text>
              </Container>
              <Image src={item.image} className={classes.featureImage} />
            </Container>
          ))}
        </Container>
      </Container>
    </Container>
  );
};
