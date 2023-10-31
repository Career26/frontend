import { selectSuggestion, useGetSuggestionMutation } from '@apis/questionsApi';
import { Accordion, Badge, List, Loader, Paper } from '@mantine/core';
import { selectSelectedCareerPathId, selectSelectedQuestion } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import React, { useEffect, useState } from 'react';
import { IconBulb, IconQuestionMark, IconStar } from '@tabler/icons-react';
import { SampleAnswerFormat } from '@datatypes/question';

import { TextWithIconBlock } from './TextWithIconBlock';

const SuggestedFormat = ({ suggestedFormat }: { suggestedFormat: SampleAnswerFormat }) => (
  <List spacing="md" center>
    {Object.entries(suggestedFormat).map(([key, value]) => (
      <List.Item key={`suggestion-${key}`} icon={<Badge>{key}</Badge>}>
        {value}
      </List.Item>
    ))}
  </List>
);

export const QuestionSuggestion = () => {
  const [value, setValue] = useState<string | null>(null);
  const careerPathId = useAppSelector(selectSelectedCareerPathId);
  const selectedQuestion = useAppSelector(selectSelectedQuestion);
  const fixedCacheKey = `suggestion-${careerPathId}-${selectedQuestion?.question}`;
  const [getSuggestion, { isLoading: suggestionLoading }] = useGetSuggestionMutation({
    fixedCacheKey,
  });
  const suggestion = useAppSelector((state) => selectSuggestion(state, fixedCacheKey));

  useEffect(() => {
    if (!selectedQuestion || !value || !careerPathId) {
      return;
    }
    if (suggestion) {
      return;
    }
    getSuggestion({ question: selectedQuestion.question, careerPathId });
  }, [value, selectedQuestion, careerPathId]);

  useEffect(() => {
    setValue(null);
  }, [selectedQuestion, careerPathId]);

  return (
    <Paper withBorder>
      <Accordion value={value} onChange={setValue}>
        <Accordion.Item value="suggestion">
          <Accordion.Control>Show Suggestion</Accordion.Control>
          <Accordion.Panel>
            {suggestionLoading ? (
              <Loader type="dots" />
            ) : (
              suggestion && (
                <>
                  <TextWithIconBlock
                    title="Suggested Format"
                    content={<SuggestedFormat suggestedFormat={suggestion?.suggestedFormat} />}
                    Icon={<IconStar fill="yellow" />}
                  />
                  <TextWithIconBlock
                    title="Sample Answer"
                    content={suggestion?.sampleAnswer}
                    Icon={<IconBulb fill="yellow" />}
                  />
                  <TextWithIconBlock
                    title="Reasoning"
                    content={suggestion?.whySuitable}
                    Icon={<IconQuestionMark />}
                  />
                </>
              )
            )}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Paper>
  );
};
