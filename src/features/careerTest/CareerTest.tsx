import React from 'react';

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
} from '@mantine/core';
import { IconWriting, IconRoute, IconTrophy } from '@tabler/icons-react';
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
  },
}));

export const CareerTest = () => {
  const { classes } = useStyles();

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

        <Container className={classes.progressContainer}>
          <Progress value={0} label="0%" size="xl" radius="xl" />
        </Container>

        <Container className={classes.questionContainer}>
          <form>
            <Text className={classes.questionTitle}>Your Recent Education</Text>
            <TextInput
              label="What university did you most recently attended?"
              placeholder="e.g. Cambridge, Oxford"
            />
            <TextInput label="What degree did you study?" placeholder="e.g. Computer Science" />
            <Select
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
              label="This grade is predicted"
              {...form.getInputProps('isPredictedGrade', { type: 'checkbox' })}
            />

            <Group position="center" mt="xl">
              <Button type="submit">Next</Button>
            </Group>
          </form>
        </Container>
      </>
    </Shell>
  );
};
