import { RatingResponse } from '@datatypes/question';
import { Accordion, Button, Paper } from '@mantine/core';
import React, { useState } from 'react';
import { IconChecklist, IconCircleCheck, IconInfoCircle } from '@tabler/icons-react';
import commonStyles from '@shared/styles/commonStyles.module.scss';

import { TextWithIconBlock } from './TextWithIconBlock';

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
  const [value, setValue] = useState<string | null>('rating');
  if (!rating) {
    return null;
  }
  return (
    <>
      <Paper h="auto" withBorder shadow="md">
        <Accordion value={value} onChange={setValue}>
          <Accordion.Item value="rating">
            <Accordion.Control>Answer Rating</Accordion.Control>
            <Accordion.Panel>
              <>
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
              </>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Paper>
      <div className={commonStyles.row}>
        <Button variant="light" onClick={onClickReset}>
          Retry
        </Button>
        <Button variant="outline" disabled={nextDisabled} onClick={onClickNext}>
          Next
        </Button>
      </div>
    </>
  );
};
