import { RatingResponse } from '@datatypes/interview';
import { Accordion, Button, Paper, Text, createStyles, rem } from '@mantine/core';
import React, { useState } from 'react';
import { IconChecklist, IconCircleCheck, IconInfoCircle } from '@tabler/icons-react';
import classNames from 'classnames';

type QuestionRatingProps = {
  onClickReset: () => void;
  onClickNext: () => void;
  nextDisabled?: boolean;
  rating?: RatingResponse;
};

const ratingStyles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: rem(20),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: rem(20),
  },
  textIcon: {
    display: 'flex',
    gap: rem(10),
  },
  column: {
    flexDirection: 'column',
  },
});

const TextWithIconBlock = ({
  title,
  content,
  Icon,
}: {
  title: string;
  content: string;
  Icon: React.ReactNode;
}) => {
  const { classes } = ratingStyles();
  return (
    <div>
      <div className={classes.textIcon}>
        {Icon}
        <Text weight="bold">{title}</Text>
      </div>
      {content}
    </div>
  );
};

export const QuestionRating = ({
  onClickReset,
  onClickNext,
  nextDisabled,
  rating,
}: QuestionRatingProps) => {
  const { classes } = ratingStyles();
  const [value, setValue] = useState<string | null>('rating');
  if (!rating) {
    return null;
  }
  return (
    <div className={classNames(classes.textIcon, classes.column)}>
      <Paper h="auto" withBorder shadow="md">
        <Accordion value={value} onChange={setValue}>
          <Accordion.Item value="rating">
            <Accordion.Control>Answer Rating</Accordion.Control>
            <Accordion.Panel>
              <div className={classes.container}>
                <TextWithIconBlock
                  Icon={<IconCircleCheck color="green" />}
                  title="Positives"
                  content={rating.answerPositives}
                />
                <TextWithIconBlock
                  Icon={<IconInfoCircle color="orange" />}
                  title="Improvements"
                  content={rating.suggestedImprovements}
                />
                <TextWithIconBlock
                  Icon={<IconChecklist />}
                  title="Example Answer"
                  content={rating.exampleAnswer}
                />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
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
