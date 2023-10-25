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
  generalFeedback: string;
  exampleAnswer: string;
  suggestedImprovements: string;
}

export interface SampleAnswerFormat {
  situation: string;
  task: string;
  action: string;
  response: string;
}

export interface SuggestionResponse {
  sampleAnswer: string;
  suggestedFormat: SampleAnswerFormat;
  whySuitable: string;
}
