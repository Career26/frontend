export interface Question {
  category: string;
  question: string;
}

export interface RateAnswerInput {
  answer: string;
  question: string;
  careerPathId: string;
}

export interface SuggestionInput {
  question: string;
  careerPathId: string;
}

export interface RatingResponse {
  answerPositives: string;
  exampleAnswer: string;
  suggestedImprovements: string;
}

export interface SuggestionResponse {
  sampleAnswer: string;
  suggestedFormat: string;
  whySuitable: string;
}
