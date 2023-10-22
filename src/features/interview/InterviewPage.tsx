import { useGetQuestionsQuery, useRateAnswerMutation } from '@apis/questionsApi';
import { Button, Container, Group, Textarea } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { Shell } from '@shared/components/shell/Shell';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import {
  addQuestionColors,
  selectQuestionColors,
  selectSelectedCareerPathId,
  selectSelectedQuestion,
  selectSelectedQuestionId,
} from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import React, { useEffect } from 'react';
import { LoadingLens } from '@shared/components/loadingScreen/LoadingLens';

import { QuestionSuggestion } from './QuestionSuggestion';
import { QuestionNavBar } from './QuestionNavBar';
import { QuestionRating } from './QuestionRating';
import styles from './interviewStyles.module.scss';
import { QuestionCard } from './QuestionCard';

export const InterviewPage = () => {
  const dispatch = useAppDispatch();
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
    return <LoadingLens />;
  }

  if (!selectedQuestion) {
    return null;
  }

  return (
    <Shell
      navbar={<QuestionNavBar selectedQuestionId={selectedQuestionId} questions={questions} />}
    >
      <Container py="md" className={styles.container}>
        <QuestionCard
          title={`Question ${selectedQuestionId + 1}`}
          question={selectedQuestion.question}
          category={selectedQuestion.category}
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
          maxRows={10}
          autosize
        />
        <Group justify="flex-end">
          <Button
            variant="outline"
            disabled={!form.isValid() || ratingLoading}
            loading={ratingLoading}
            w="20%"
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
        </Group>

        <QuestionRating
          rating={rating}
          onClickNext={() => toggleQuestionId(selectedQuestionId + 1)}
          onClickReset={onClickReset}
          nextDisabled={questions && selectedQuestionId === questions.length - 1}
        />
      </Container>
    </Shell>
  );
};
