import React, { useState } from 'react';

// external
import { useHistory } from 'react-router-dom';
import {
  Container,
  Progress,
  Text,
  TextInput,
  createStyles,
  rem,
  Select,
  Group,
  Button,
  Checkbox,
  Stepper,
} from '@mantine/core';
import { IconWriting, IconRoute, IconTrophy, IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

// shared
import { PageHeader } from '@shared/components/pageHeader/PageHeader';

// config
import { urls } from '@shared/config/urlConstants';
import { Shell } from '@shared/components/shell/Shell';
import { Tile } from './components/tile';

const useStyles = createStyles((theme) => ({
  titleContainer: {
    paddingTop: rem(80),
    // paddingBottom: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('md')]: {
      paddingTop: rem(60),
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

  testInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    paddingLeft: 0,
    paddingRight: 0,

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  progressContainer: {
    paddingTop: 0,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
  },

  questionContainer: {
    paddingTop: 0,
  },

  questionTitle: {
    fontSize: rem(30),
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colors.gray[9],
    textAlign: 'center',
    paddingBottom: theme.spacing.xl,
  },

  questionInput: {
    paddingBottom: theme.spacing.xl,
  },
}));

export const CareerTest = () => {
  const { classes } = useStyles();
  const [progress, setProgress] = useState(0);
  const [eductionCount, setEducationCount] = useState(1);

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const history = useHistory();

  const takeTest = () => history.push(urls.careersTest);

  const tileContent = [
    {
      title: 'Complete the Test',
      description:
        'Embark on your career journey by taking our comprehensive test to discover the best path for you.',
      icon: <IconWriting />,
    },
    {
      title: 'Explore Your Paths',
      description:
        'Using the results dive into career paths that align with your strengths and passions. Find the perfect fit.',
      icon: <IconRoute />,
    },
    {
      title: 'Unlock Your Potential',
      description:
        'Elevate your interview skills, refine your CV, and connect with professionals to accelerate your career growth.',
      icon: <IconTrophy />,
    },
  ];

  const form = useForm({
    initialValues: {
      email: '',
      isPredictedGrade: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Shell header={<PageHeader getStarted={takeTest} />}>
      <>
        <Container className={classes.titleContainer}>
          <Text className={classes.titleText}>Free Career Path Test</Text>
          <Container className={classes.testInfoContainer}>
            {tileContent.map((item, index) => (
              <Tile
                withSpacing={index % 2 != 0}
                withBottomPadding={index + 1 !== tileContent.length}
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </Container>
        </Container>

        {progress > 0 && (
          <Container className={classes.progressContainer}>
            <Progress value={progress} label={`${progress}%`} size="xl" radius="xl" />
          </Container>
        )}

        <Container>
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step label="Education"></Stepper.Step>
            <Stepper.Step label="Experience"></Stepper.Step>
            <Stepper.Step label="Preferences"></Stepper.Step>
            <Stepper.Step label="Career Paths"></Stepper.Step>
          </Stepper>
        </Container>

        <Container className={classes.questionContainer}>
          <Text className={classes.questionTitle}>Your Recent Education</Text>
          <TextInput
            label="Which university did you attend most recently?"
            placeholder="e.g. Cambridge, Oxford"
            className={classes.questionInput}
          />
          <TextInput
            label="What degree did you study?"
            placeholder="e.g. Computer Science"
            className={classes.questionInput}
          />
          <Select
            className={classes.questionInput}
            label="What type of degree was this?"
            placeholder="Select a degree type"
            data={[
              { value: 'PhD', label: 'PhD' },
              { value: 'MSc', label: 'MSc' },
              { value: 'MA', label: 'MA' },
              { value: 'BSc', label: 'BSc' },
              { value: 'BA', label: 'BA' },
            ]}
          />
          <Select
            className={classes.questionInput}
            label="What grade did you achieve / are likley to achieve?"
            placeholder="Select the achieved grade"
            data={[
              { value: 'First Class (1st)', label: 'First Class (1st)' },
              { value: 'Second Class Upper (2:1)', label: 'Second Class Upper (2:1)' },
              { value: 'Second Class Lower (2:2', label: 'Second Class Lower (2:2' },
              { value: 'Third Class (3rd)', label: 'Third Class (3rd)' },
              { value: 'Pass', label: 'Pass' },
            ]}
          />
          <Checkbox
            className={classes.questionInput}
            label="This grade is predicted"
            {...form.getInputProps('isPredictedGrade', { type: 'checkbox' })}
          />

          <Group position="left">
            <Button leftIcon={<IconPlus />} onClick={() => setEducationCount(eductionCount + 1)}>
              Add Another University
            </Button>
          </Group>

          <Group position="center">
            <Button type="submit" onClick={() => setActive(active + 1)}>
              Next Question
            </Button>
          </Group>
        </Container>
      </>
    </Shell>
  );
};
