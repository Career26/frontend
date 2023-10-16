import { useGetQuestionsQuery, useRateAnswerMutation } from '@apis/questionsApi';
import { Button, Container, Textarea, createStyles, rem } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { LoadingScreen } from '@shared/components/loadingScreen/LoadingScreen';
import { Shell } from '@shared/components/shell/Shell';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { featureStyles } from '@shared/styles/featureStyles';
import {
  addQuestionColors,
  selectQuestionColors,
  selectSelectedCareerPathId,
  selectSelectedQuestion,
  selectSelectedQuestionId,
} from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React, { useEffect } from 'react';
import { CareerCard } from '@shared/components/cards/CareerCard';

import { QuestionSuggestion } from './QuestionSuggestion';
import { QuestionNavBar } from './QuestionNavBar';
import { QuestionRating } from './QuestionRating';

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
  const dispatch = useAppDispatch();
  const { classes } = interviewStyles();
  const { classes: featureClasses } = featureStyles();
  const { toggleQuestionId } = usePageNavigation();
  const careerPathId = useAppSelector(selectSelectedCareerPathId);
  const selectedQuestion = useAppSelector(selectSelectedQuestion);
  const selectedQuestionId = useAppSelector(selectSelectedQuestionId);
  const { data: questions, isFetching } = useGetQuestionsQuery();
  const [rateAnswer, { data: rating, isLoading: ratingLoading, reset: resetRating }] =
    useRateAnswerMutation();
  const questionColors = useAppSelector(selectQuestionColors);

  const form = useForm<{ answer: string }>({
    initialValues: { answer: '' },
    validate: { answer: hasLength({ min: 10, max: 300 }, 'Answer must be 10-300 characters long') },
  });

  const onClickReset = () => {
    form.reset();
    resetRating();
  };

  useEffect(() => {
    if (!questions) {
      return;
    }
    const categoies = questions.map(({ category }) => category);
    dispatch(addQuestionColors(categoies));
  }, [questions]);

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!selectedQuestion) {
    return null;
  }

  return (
    <div className={featureClasses.wrapper}>
      <Shell
        navbar={<QuestionNavBar selectedQuestionId={selectedQuestionId} questions={questions} />}
      >
        <div className={featureClasses.content}>
          <Container className={classes.container}>
            <CareerCard
              title={`Question ${selectedQuestionId + 1}`}
              subTitle={selectedQuestion.question}
              badge={selectedQuestion.category}
              color={questionColors[selectedQuestion.category]}
            />
            <QuestionSuggestion />
            <Textarea
              {...form.getInputProps('answer')}
              label="Answer"
              placeholder="Enter your response here"
              variant="filled"
              withAsterisk
              minRows={5}
            />

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
            <QuestionRating
              rating={rating}
              onClickNext={() => toggleQuestionId(selectedQuestionId + 1)}
              onClickReset={onClickReset}
              nextDisabled={questions && selectedQuestionId === questions.length - 1}
            />
          </Container>
        </div>
      </Shell>
    </div>
  );
};
