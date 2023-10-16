import { RatingResponse } from '@datatypes/interview';
import { Button, Divider, Paper, Text, createStyles, rem } from '@mantine/core';
import React from 'react';

const questionRankingStyles = createStyles({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: rem(20),
  },
});

type QuestionRatingProps = {
  onClickReset: () => void;
  onClickNext: () => void;
  nextDisabled?: boolean;
  rating?: RatingResponse;
};

export const QuestionRating = ({
  onClickReset,
  onClickNext,
  nextDisabled,
  rating,
}: QuestionRatingProps) => {
  const { classes } = questionRankingStyles();
  if (!rating) {
    return null;
  }
  return (
    <div>
      <Paper h="auto" shadow="md" radius="md" p="md" withBorder>
        <Text>Rating and feedback</Text>
        <Divider />
        Positives: {rating.answerPositives}
        Improvements: {rating.suggestedImprovements}
        Example: {rating.exampleAnswer}
      </Paper>
      <div className={classes.buttons}>
        <Button variant="light" onClick={onClickReset}>
          Retry
        </Button>
        <Button variant="outline" disabled={nextDisabled} onClick={onClickNext}>
          Next
        </Button>
      </div>
    </div>
  );
};
