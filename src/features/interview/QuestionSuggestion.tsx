import { useGetSuggestionMutation } from '@apis/interviewApi';
import { Accordion, Loader, Paper, createStyles } from '@mantine/core';
import { selectSelectedCareerPathId, selectSelectedQuestion } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

const suggestionStyles = createStyles({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestion: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const QuestionSuggestion = () => {
  const { classes } = suggestionStyles();
  const [value, setValue] = useState<string | null>(null);
  const careerPathId = useAppSelector(selectSelectedCareerPathId);
  const selectedQuestion = useAppSelector(selectSelectedQuestion);
  const [getSuggestion, { data: suggestion, isLoading: suggestionLoading }] =
    useGetSuggestionMutation();

  useEffect(() => {
    setValue(null);
    if (!selectedQuestion) {
      return;
    }
    getSuggestion({ careerPathId, question: selectedQuestion.question });
  }, [selectedQuestion]);

  return (
    <Paper h="auto" withBorder shadow="md">
      <Accordion value={value} onChange={setValue}>
        <Accordion.Item value="suggestion">
          <Accordion.Control>Show Suggestion</Accordion.Control>
          <Accordion.Panel className={classNames({ [classes.loader]: suggestionLoading })}>
            {suggestionLoading ? (
              <Loader />
            ) : (
              <div className={classes.suggestion}>
                <div>Example Format: {suggestion?.suggestedFormat}</div>
                <div>Sample Answer: {suggestion?.sampleAnswer}</div>
                <div>Why is this Suitable?: {suggestion?.whySuitable}</div>
              </div>
            )}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Paper>
  );
};
