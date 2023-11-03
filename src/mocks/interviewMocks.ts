import { Question, RatingResponse, SuggestionResponse } from '@datatypes/question';

export const mockInterviewQuestions: Question[] = Array.from(new Array(20).keys()).map((id) => ({
  category: `Category ${id}`,
  question: `Can you explain when blah blah blah ${id}`,
}));

export const mockSuggestion: SuggestionResponse = {
  sampleAnswer: 'Here is a sample answer',
  suggestedFormat: {
    situation: 'I was doing something',
    task: 'I had to do something',
    action: 'I did something',
    response: 'I completed something',
  },
  whySuitable: 'Because it is a good answer',
};

export const mockRating: RatingResponse = {
  generalFeedback: 'This answer was ok',
  exampleAnswer: 'This answer is better',
  suggestedImprovements: 'Improve this answer by using this answer',
};
