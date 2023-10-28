import { RatingResponse } from '@datatypes/question';
import { Accordion, Button, Paper } from '@mantine/core';
import React, { useState } from 'react';
import { IconChecklist, IconSpeakerphone, IconWriting } from '@tabler/icons-react';
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
      <Paper withBorder>
        <Accordion value={value} onChange={setValue}>
          <Accordion.Item value="rating">
            <Accordion.Control>Answer Rating</Accordion.Control>
            <Accordion.Panel>
              <>
                <TextWithIconBlock
                  Icon={<IconSpeakerphone color="orange" />}
                  title="General Feedback"
                  content={rating.generalFeedback}
                />
                <TextWithIconBlock
                  Icon={<IconChecklist color="green" />}
                  title="Improvements"
                  content={rating.suggestedImprovements}
                />
                <TextWithIconBlock
                  Icon={<IconWriting />}
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
