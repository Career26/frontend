export type InterviewQuestion = { [key: string]: { title: string; description: string } };

export const mockInterviewQuestions = Array.from(new Array(20).keys()).reduce<InterviewQuestion>(
  (agg, id) => ({
    ...agg,
    [`interview-${id}`]: {
      title: `Question ${id}`,
      description: `Can you explain when blah blah blah ${id}`,
    },
  }),
  {},
);
