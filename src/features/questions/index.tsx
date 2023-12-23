// import { useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { Button, Container, Group, Textarea } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';

import { Shell } from '@shared/components/shell/Shell';
import { LoadingLens } from '@shared/components/loadingScreen/LoadingLens';
import { QuestionSuggestion } from '@questions/QuestionSuggestion';
import { QuestionNavBar } from '@questions/QuestionNavBar';
import { QuestionRating } from '@questions/QuestionRating';
import { QuestionCard } from '@questions/QuestionCard';

import { useGetQuestionsQuery, useRateAnswerMutation } from '@apis/questionsApi';
import { usePageSetup } from '@shared/hooks/usePageSetup';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import {
  addQuestionColors,
  selectQuestionColors,
  selectSelectedCareerPathId,
  selectSelectedQuestion,
  selectSelectedQuestionId,
} from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';

import { urls } from '@shared/constants/urlConstants';

// import type { LoaderFunctionArgs } from '@remix-run/node';

import styles from '@questions/questions.module.css';

// export const loader = async ({ params }: LoaderFunctionArgs) => {
//   const id = params['*'];
//   const [careerId, questionId] = id?.split('/') || [];
//   return { careerId, questionId };
// };

const Index = () => {
  const navigate = useNavigate();
  const { careerId: _cId, questionId: _qId } = useLoaderData<typeof loader>();
  const dispatch = useAppDispatch();
  const { loading, unauthenticated } = usePageSetup();
  const { toggleQuestionId, toggleCareerId } = usePageNavigation();
  const careerPathId = useAppSelector(selectSelectedCareerPathId);
  const selectedQuestion = useAppSelector(selectSelectedQuestion);
  const selectedQuestionId = useAppSelector(selectSelectedQuestionId);
  const { data: questions, isFetching } = useGetQuestionsQuery();
  const [rateAnswer, { data: rating, isLoading: ratingLoading, reset: resetRating }] =
    useRateAnswerMutation();
  const questionColors = useAppSelector(selectQuestionColors);

  const onClickReset = () => {
    form.reset();
    resetRating();
  };

  const form = useForm<{ answer: string }>({
    initialValues: { answer: '' },
    validate: {
      answer: hasLength({ min: 1, max: 1000 }, 'Answer must be 10-1000 characters long'),
    },
  });

  useEffect(() => {
    if (!questions) {
      return;
    }
    const categoies = questions.map(({ category }) => category);
    dispatch(addQuestionColors(categoies));
  }, [questions]);

  // useEffect(() => {
  //   if (!careerPaths || !questions) {
  //     return;
  //   }
  //   if (!careerPaths[careerId]) {
  //     toggleCareerId(defaultCareerId);
  //     toggleQuestionId(defaultQuestionId);
  //     return;
  //   }
  //   if (typeof questionId !== 'number' || questionId < 0 || questionId > questions.length - 1) {
  //     toggleQuestionId(defaultQuestionId);
  //     return;
  //   }
  //   dispatch(setSelectedCareerPathId(careerId));
  //   dispatch(setSelectedQuestionId(questionId));
  // }, [questions, careerPaths, careerId, questionId]);

  if (loading || isFetching) {
    return <LoadingLens />;
  }

  if (unauthenticated) {
    navigate(urls.landingPage);
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
