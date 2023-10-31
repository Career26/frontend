import { Question } from '@datatypes/question';

export const mockInterviewQuestions: Question[] = Array.from(new Array(20).keys()).map((id) => ({
  category: `Category ${id}`,
  question: `Can you explain when blah blah blah ${id}`,
}));
