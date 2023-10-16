import { useGetInterviewQuestionsQuery, useRateAnswerMutation } from '@apis/interviewApi';
import {
  Badge,
  Button,
  Container,
  Divider,
  Navbar,
  Paper,
  ScrollArea,
  Text,
  Textarea,
  createStyles,
  rem,
} from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { LoadingScreen } from '@shared/components/loadingScreen/LoadingScreen';
import { Shell } from '@shared/components/shell/Shell';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { featureStyles } from '@shared/styles/featureStyles';
import { navStyles } from '@shared/styles/navStyles';
import { selectSelectedQuestion, selectSelectedQuestionId } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import classNames from 'classnames';
import React from 'react';

const interviewStyles = createStyles({
  container: {
    flexDirection: 'column',
    marginTop: rem(20),
    display: 'flex',
    gap: rem(20),
    width: '100%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: rem(20),
  },
});

export const InterviewPage = () => {
  const { classes } = interviewStyles();
  const { classes: featureClasses } = featureStyles();
  const { classes: navClasses } = navStyles();
  const { toggleQuestionId } = usePageNavigation();
  const selectedQuestion = useAppSelector(selectSelectedQuestion);
  const selectedQuestionId = useAppSelector(selectSelectedQuestionId);
  const { data, isFetching } = useGetInterviewQuestionsQuery();
  const [rateAnswer, { data: rating, isLoading: ratingLoading }] = useRateAnswerMutation();

  const form = useForm<{ answer: string }>({
    initialValues: { answer: '' },
    validate: { answer: hasLength({ min: 10, max: 300 }, 'Answer must be 10-300 characters long') },
  });

  console.log(rating);

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!selectedQuestion) {
    return null;
  }

  return (
    <div className={featureClasses.wrapper}>
      <Shell
        navbar={
          <Navbar p="xs" className={navClasses.navBar}>
            <Navbar.Section grow mt="md" className={navClasses.navLink}>
              <ScrollArea h="80vh">
                {data?.map(({ question, category }, index) => (
                  <Button
                    onClick={() => toggleQuestionId(index)}
                    key={`question-${index}`}
                    className={classNames(navClasses.navButton, navClasses.linkAction, {
                      [navClasses.active]: selectedQuestionId === index,
                    })}
                  >
                    {question}
                    <Badge>{category}</Badge>
                  </Button>
                ))}
              </ScrollArea>
            </Navbar.Section>
          </Navbar>
        }
      >
        <div className={featureClasses.content}>
          <Container className={classes.container}>
            <Paper h="auto" shadow="md" radius="md" p="md" withBorder>
              <Text>Question {selectedQuestionId}</Text>
              <Divider />
              {selectedQuestion.question}
            </Paper>
            <Paper h="auto" shadow="md" radius="md" p="md" withBorder>
              <Textarea
                {...form.getInputProps('answer')}
                label="Answer"
                placeholder="Enter your response here"
                variant="filled"
                withAsterisk
                minRows={10}
              />
            </Paper>
            <div className={classes.buttons}>
              <Button
                variant="outline"
                disabled={!form.isValid() || ratingLoading}
                loading={ratingLoading}
                onClick={() =>
                  rateAnswer({ question: selectedQuestion.question, answer: form.values.answer })
                }
              >
                Submit
              </Button>
            </div>
            <Paper h={200} shadow="md" radius="md" p="md" withBorder>
              <Text>Rating and feedback</Text>
              <Divider />
              {rating}
            </Paper>
            <div className={classes.buttons}>
              <Button variant="light">Retry</Button>
              <Button variant="outline">Next</Button>
            </div>
          </Container>
        </div>
      </Shell>
    </div>
  );
};
