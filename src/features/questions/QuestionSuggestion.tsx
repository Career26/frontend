import { useEffect, useState } from 'react';
import { Badge, List, Loader, Paper, Switch } from '@mantine/core';

import { selectSuggestion, useGetSuggestionMutation } from '@apis/questionsApi';
import { selectSelectedCareerPathId, selectSelectedQuestion } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';

import { TextWithIconBlock } from '@shared/components/display/TextWithIconBlock';

import type { SampleAnswerFormat } from '@datatypes/question';

interface SuggestedFormatProps {
  suggestedFormat: SampleAnswerFormat;
}

const SuggestedFormat = ({ suggestedFormat }: SuggestedFormatProps) => (
  <List spacing="md" center>
    {Object.entries(suggestedFormat).map(([key, value]) => (
      <List.Item key={`suggestion-${key}`} icon={<Badge w="100px">{key}</Badge>}>
        {value}
      </List.Item>
    ))}
  </List>
);

export const QuestionSuggestion = () => {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const careerPathId = useAppSelector(selectSelectedCareerPathId);
  const selectedQuestion = useAppSelector(selectSelectedQuestion);
  const fixedCacheKey = `suggestion-${careerPathId}-${selectedQuestion?.question}`;
  const [getSuggestion, { isLoading: suggestionLoading }] = useGetSuggestionMutation({
    fixedCacheKey,
  });
  const suggestion = useAppSelector((state) => selectSuggestion(state, fixedCacheKey));

  useEffect(() => {
    if (!selectedQuestion || !showSuggestion || !careerPathId) {
      return;
    }
    if (suggestion) {
      return;
    }
    getSuggestion({ question: selectedQuestion.question, careerPathId });
  }, [showSuggestion, selectedQuestion, careerPathId]);

  useEffect(() => {
    setShowSuggestion(false);
  }, [selectedQuestion, careerPathId]);

  return (
    <>
      <Switch
        py="md"
        label="Show Suggestion"
        checked={showSuggestion}
        onChange={() => setShowSuggestion(!showSuggestion)}
      />
      {showSuggestion && (
        <Paper withBorder p="md">
          {suggestionLoading ? (
            <Loader type="dots" />
          ) : (
            suggestion && (
              <>
                <TextWithIconBlock
                  title="Suggested Format"
                  content={<SuggestedFormat suggestedFormat={suggestion?.suggestedFormat} />}
                />
                <TextWithIconBlock title="Sample Answer" content={suggestion?.sampleAnswer} />
                <TextWithIconBlock title="Reasoning" content={suggestion?.whySuitable} />
              </>
            )
          )}
        </Paper>
      )}
    </>
  );
};
