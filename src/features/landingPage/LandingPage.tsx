import React from 'react';
import {
  createStyles,
  Container,
  Text,
  Button,
  Group,
  rem,
  Image,
  Title,
  Badge,
  Card,
} from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import careerProgressImg from './assets/careerProgress.svg';
import cvImg from './assets/cv.svg';
import careerPathsImg from './assets/careerPaths.svg';
import interviewImg from './assets/interview.svg';
import successImg from './assets/success.svg';
import { useHistory } from 'react-router-dom';
import { urls } from '@shared/config/urlConstants';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 'none',
  },

  // hero
  heroContainer: {
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
  heroTitleContainer: {
    flex: 1,
  },
  heroTitle: {
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
  heroDescription: {
    marginTop: theme.spacing.xl,
    fontSize: rem(20),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },
  heroImage: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,
    paddingRight: `calc(${theme.spacing.xl} * 2)`,
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

  // features
  featuresMain: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    background: theme.colors.gray[0],
    padding: 0,
    maxWidth: 'none',
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
    paddingBottom: theme.spacing.sm,
    fontSize: rem(24),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
  },
  featureDescription: {
    paddingBottom: theme.spacing.md,
    fontSize: rem(17),
    color: theme.colors.gray[7],
  },
  featureImage: {
    flex: 1,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,
    paddingRight: `calc(${theme.spacing.xl} * 2)`,
  },

  // pricing
  pricingContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    paddingTop: `calc(${theme.spacing.xl} * 1.5)`,
    paddingBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
  pricingCardContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  pricingCard: {
    background: theme.colors.blue[0],
    maxWidth: rem(500),
    borderRadius: 'sm',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pricingPlanTitle: {
    fontSize: rem(22),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
    paddingBottom: theme.spacing.sm,
  },
  pricingPlanPrice: {
    fontSize: rem(28),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
  },
  bulletPointMain: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  paddedPoint: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    display: 'flex',
    flexDirection: 'row',
  },
  bulletPointContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  // call to action
  actionContainer: {
    maxWidth: 'none',
    background: theme.colors.gray[0],
  },
}));

export const LandingPage = () => {
  const { classes } = useStyles();
  const history = useHistory();

  return (
    <Container className={classes.mainContainer}>
      <Container className={classes.heroContainer}>
        <Container className={classes.heroTitleContainer}>
          <Title className={classes.heroTitle}>
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
          <Text className={classes.heroDescription} color="dimmed">
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
        <Image src={careerProgressImg} className={classes.heroImage} />
      </Container>

      <Container className={classes.featuresMain}>
        {[
          {
            image: careerPathsImg,
            title: 'Discover Your Ideal Career Path',
            description:
              "Find the career path that aligns with your aspirations and strengths. Our suggestions empower you to make informed decisions about your future. Take a short questionnaire where we delve into your interests, values, and skills and we'll deliver tailored recommendations. Navigate confidently toward your dream career with our expert guidance.",
          },
          {
            image: interviewImg,
            title: 'Ace Interviews With Confidence',
            description:
              "Step into your interviews with confidence. Our expertly crafted mock interview questions prepare you for any scenario. Practicing with our extensive range of interview simulations, you'll gain the expertise needed to impress employers and be well-equipped to excel in even the most challenging interviews.",
          },
          {
            image: cvImg,
            title: 'Shine on Your CV',
            description:
              'Our CV enhancement service ensures you stand out in a competitive job market. We craft a CV that highlights your strengths, experiences, and achievements in a compelling manner. Unlock opportunities and leave a lasting impression with a professionally tailored CV that showcases your true potential.',
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

      <Container className={classes.pricingContainer}>
        <Badge size="xl" radius="sm" variant="light" mb={'xl'}>
          Pricing
        </Badge>

        <Container className={classes.pricingCardContainer}>
          <Card className={classes.pricingCard}>
            <Text className={classes.pricingPlanTitle}>Pro Plan</Text>
            <Text className={classes.pricingPlanPrice}>
              £29{' '}
              <Text className={classes.pricingPlanPrice} component="span">
                / Month
              </Text>
            </Text>
            <Container className={classes.bulletPointMain}>
              <span className={classes.bulletPointContainer}>
                <IconCircleCheck />
                <Text pl={'xs'} size="md" color="dimmed">
                  Unlimited Career Path Suggestions
                </Text>
              </span>
              <span className={(classes.bulletPointContainer, classes.paddedPoint)}>
                <IconCircleCheck />
                <Text pl={'xs'} size="md" color="dimmed">
                  Unlimited Interview Practise
                </Text>
              </span>
              <span className={classes.bulletPointContainer}>
                <IconCircleCheck />
                <Text pl={'xs'} size="md" color="dimmed">
                  Advanced CV Enhancement and Tailoring
                </Text>
              </span>
            </Container>

            <Button size="md" onClick={() => history.push(urls.careersTest)}>
              Get Started
            </Button>
          </Card>
        </Container>
      </Container>

      <Container className={classes.actionContainer}>
        <Container className={classes.heroContainer}>
          <Container className={classes.heroTitleContainer}>
            <Title className={classes.heroTitle}>
              Join & Achieve{' '}
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                inherit
              >
                Career Success
              </Text>
            </Title>
            <Text className={classes.heroDescription} color="dimmed">
              Ready to unleash your potential? Take our free questionnaire to view your personalised
              career paths now
            </Text>
            <Group className={classes.controls}>
              <Button
                size="xl"
                className={classes.control}
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                onClick={() => history.push(urls.careersTest)}
              >
                Try For Free!
              </Button>
            </Group>
          </Container>

          <Image src={successImg} className={classes.heroImage} />
        </Container>
      </Container>
    </Container>
  );
};
