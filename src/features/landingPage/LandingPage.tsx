import React from 'react';
import { createStyles, Container, Badge, rem, Text } from '@mantine/core';
import careerProgressImg from './assets/careerProgress.svg';
import cvImg from './assets/cv.svg';
import careerPathsImg from './assets/careerPaths.svg';
import interviewImg from './assets/interview.svg';
import successImg from './assets/success.svg';
import { useHistory } from 'react-router-dom';
import { urls } from '@shared/config/urlConstants';
import { Feature } from './components/feature';
import { Hero } from './components/hero';
import { Pricing } from './components/pricing';
import { SimpleHeader } from './components/header';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 'none',
  },

  featuresContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    background: theme.colors.gray[0],
    padding: 0,
    maxWidth: 'none',
  },

  pricingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    maxWidth: 'none',
  },

  pricingText: {
    fontSize: rem(32),
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colors.gray[9],
    paddingTop: theme.spacing.xl,
    paddingBottom: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
      marginTop: theme.spacing.xl,
    },
  },

  pricingTierContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export const LandingPage = () => {
  const { classes } = useStyles();
  const history = useHistory();

  const featuresTag = 'features';
  const pricingTag = 'pricing';

  return (
    <Container className={classes.mainContainer}>
      <SimpleHeader
        links={[
          { label: 'Features', link: featuresTag },
          { label: 'Pricing', link: pricingTag },
        ]}
      />
      <Hero
        image={careerProgressImg}
        actionButtonText="Start Your Journey Now!"
        subheadingText="Reveal your perfect career path, ace interviews and elevate your CV with our all-in-one
          career advisory platform"
        headingText="Discover your"
        colorHeadingText="perfect career"
        onClick={() => history.push(urls.careersTest)}
        grayBackground={false}
      />

      <Container className={classes.featuresContainer} id={featuresTag}>
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
          <Feature title={item.title} image={item.image} description={item.description} />
        ))}
      </Container>

      <Container className={classes.pricingContainer} id={pricingTag}>
        <Badge size="xl" radius="sm" variant="light">
          Pricing
        </Badge>

        <Text className={classes.pricingText}>Invest in your future. Get started for free!</Text>

        <Container className={classes.pricingTierContainer}>
          <Pricing
            title="Free Tier"
            amount="£0"
            peroid="Month"
            buttonText="Try For Free"
            benefits={[
              'Personalised Career Paths',
              'Limited Interview Questions',
              'Basic CV Enhancement',
            ]}
            onClick={() => history.push(urls.careersTest)}
          />
          <Pricing
            title="Premium Tier"
            amount="£29"
            peroid="Month"
            buttonText="Get Started"
            benefits={[
              'Personalised Career Paths',
              'Extensive Interview Questions',
              'Advanced CV Enhancement',
            ]}
            onClick={() => history.push(urls.careersTest)}
          />
        </Container>
      </Container>

      <Hero
        image={successImg}
        actionButtonText="Try For Free!"
        subheadingText="Ready to unleash your potential? Take our free questionnaire to view your career paths now"
        headingText="Join & Achieve"
        colorHeadingText="Career Success"
        onClick={() => history.push(urls.careersTest)}
        grayBackground={true}
      />
    </Container>
  );
};
