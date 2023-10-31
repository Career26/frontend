import { useGetQuestionsQuery } from '@apis/questionsApi';
import { mockInterviewQuestions } from '@mocks/interviewMocks';
import { Wrapper } from '@shared/utils/testUtil';
import { renderHook, waitFor } from '@testing-library/react';

describe('questionsApi', () => {
  it('Should return questions', async () => {
    const { result } = renderHook(() => useGetQuestionsQuery(), { wrapper: Wrapper });
    await waitFor(() => expect(result.current.data).toEqual(mockInterviewQuestions));
  });
});
