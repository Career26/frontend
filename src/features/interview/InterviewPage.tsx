import {
  useGetInterviewQuestionsQuery,
  useGetSuggestionMutation,
  useRateAnswerMutation,
} from '@apis/interviewApi';
import {
  Accordion,
  Badge,
  Button,
  Container,
  Divider,
  Loader,
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
import {
  selectSelectedCareerPathId,
  selectSelectedQuestion,
  selectSelectedQuestionId,
} from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import classNames from 'classnames';
import React, { useEffect } from 'react';

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
  const { data: questions, isFetching } = useGetInterviewQuestionsQuery();
  const [rateAnswer, { data: rating, isLoading: ratingLoading, reset: resetRating }] =
    useRateAnswerMutation();
  const careerPathId = useAppSelector(selectSelectedCareerPathId);
  const form = useForm<{ answer: string }>({
    initialValues: { answer: '' },
    validate: { answer: hasLength({ min: 10, max: 300 }, 'Answer must be 10-300 characters long') },
  });
  const [getSuggestion, { data: suggestion, isLoading: suggestionLoading }] =
    useGetSuggestionMutation();
  const clickReset = () => {
    form.reset();
    resetRating();
  };
  useEffect(() => {
    if (!selectedQuestion) {
      return;
    }
    getSuggestion({ careerPathId, question: selectedQuestion.question });
  }, [selectedQuestion]);

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
                {questions?.map(({ question, category }, index) => (
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
              <Accordion>
                <Accordion.Item value="suggestion">
                  <Accordion.Control>Show Suggestion</Accordion.Control>
                  <Accordion.Panel>
                    {suggestionLoading ? (
                      <Loader />
                    ) : (
                      <>
                        Example Format: {suggestion?.suggestedFormat}
                        Sample Answer: {suggestion?.sampleAnswer}
                        Why is this Suitable?: {suggestion?.whySuitable}
                      </>
                    )}
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Paper>
            <Paper h="auto" shadow="md" radius="md" p="md" withBorder>
              <Textarea
                {...form.getInputProps('answer')}
                label="Answer"
                placeholder="Enter your response here"
                variant="filled"
                withAsterisk
                minRows={5}
              />
            </Paper>

            <div className={classes.buttons}>
              <Button
                variant="outline"
                disabled={!form.isValid() || ratingLoading}
                loading={ratingLoading}
                onClick={() =>
                  rateAnswer({
                    question: selectedQuestion.question,
                    answer: form.values.answer,
                    careerPathId,
                  })
                }
              >
                Submit
              </Button>
            </div>
            {rating && (
              <>
                <Paper h="auto" shadow="md" radius="md" p="md" withBorder>
                  <Text>Rating and feedback</Text>
                  <Divider />
                  Positives: {rating.answerPositives}
                  Improvements: {rating.suggestedImprovements}
                  Example: {rating.exampleAnswer}
                </Paper>
                <div className={classes.buttons}>
                  <Button variant="light" onClick={clickReset}>
                    Retry
                  </Button>
                  <Button
                    variant="outline"
                    disabled={questions && selectedQuestionId === questions.length - 1}
                    onClick={() => toggleQuestionId(selectedQuestionId + 1)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </Container>
        </div>
      </Shell>
    </div>
  );
};
