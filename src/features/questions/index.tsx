import { useEffect } from 'react';
import { Button, Container, Group, Textarea } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';

import { Shell } from '@shared/components/shell/Shell';
import { LoaderWithText } from '@shared/components/loadingScreen/LoaderWithText';
import { QuestionSuggestion } from '@questions/QuestionSuggestion';
import { QuestionNavBar } from '@questions/QuestionNavBar';
import { QuestionRating } from '@questions/QuestionRating';
import { QuestionCard } from '@questions/QuestionCard';

import { useGetQuestionsQuery, useRateAnswerMutation } from '@apis/questionsApi';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import {
  addQuestionColors,
  selectQuestionColors,
  selectSelectedCareerPath,
  selectSelectedCareerPathId,
  selectSelectedQuestion,
  selectSelectedQuestionId,
} from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';

import styles from '@questions/questions.module.css';

const Index = () => {
  const dispatch = useAppDispatch();
  const { toggleQuestionId } = usePageNavigation();
  const careerPath = useAppSelector(selectSelectedCareerPath);
  const careerPathId = useAppSelector(selectSelectedCareerPathId);
  const selectedQuestion = useAppSelector(selectSelectedQuestion);
  const selectedQuestionId = useAppSelector(selectSelectedQuestionId);
  const { data: questions, isFetching } = useGetQuestionsQuery();
  const [rateAnswer, { data: rating, isLoading: ratingLoading, reset: resetRating }] =
    useRateAnswerMutation();
  const questionColors = useAppSelector(selectQuestionColors);

  const form = useForm<{ answer: string }>({
    initialValues: { answer: '' },
    validate: {
      answer: hasLength({ min: 1, max: 1000 }, 'Answer must be 10-1000 characters long'),
    },
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
    return (
      <Shell>
        <LoaderWithText
          text={[
            `Fetching questions for ${careerPath?.title}...`,
            `This can take up to 30 seconds...`,
          ]}
        />
      </Shell>
    );
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
          label={`Answer (${1000 - form.values.answer.length} characters remaining)`}
          placeholder="Enter your response here"
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

export default Index;
