import { useGetSuggestionMutation } from '@apis/questionsApi';
import {
  Accordion,
  Badge,
  List,
  Loader,
  Paper,
  Text,
  ThemeIcon,
  createStyles,
  rem,
} from '@mantine/core';
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: rem(20),
  },
  list: {
    paddingTop: rem(10),
  },
});

const NumberedList = ({ items }: { items: string[] }) =>
  items.map((item, index) => (
    <List.Item key={`suggestion-${item}`} icon={<ThemeIcon radius="xl">{index + 1}</ThemeIcon>}>
      {item}
    </List.Item>
  ));

const StarList = ({ starMap }: { starMap: { [key: string]: string } }) =>
  Object.entries(starMap).map(([key, value]) => (
    <List.Item key={`suggestion-${key}`} icon={<Badge>{key}</Badge>}>
      {value}
    </List.Item>
  ));

const getStarMap = (suggestedFormat: string) => {
  const regex = /Situation: (.*?) Task: (.*?) Action: (.*?) Result: (.*?)$/;
  const match = suggestedFormat.match(regex);
  if (!match) {
    return undefined;
  }
  return {
    Situation: match[1].trim(),
    Task: match[2].trim(),
    Action: match[3].trim(),
    Result: match[4].trim(),
  };
};

const SuggestedFormat = ({ suggestedFormat }: { suggestedFormat: string }) => {
  const { classes } = suggestionStyles();
  const starMap = getStarMap(suggestedFormat);
  const numberedItems = suggestedFormat.split(/(\\n)?\d\. /gm).filter(Boolean);
  return (
    <div>
      <Text weight="bold">Suggested Format:</Text>
      <List spacing="md" center className={classes.list}>
        {starMap ? <StarList starMap={starMap} /> : <NumberedList items={numberedItems} />}
      </List>
    </div>
  );
};

const TextBlock = ({ title, content }: { title: string; content: string }) => (
  <div>
    <Text weight="bold">{title}</Text>
    {content}
  </div>
);

export const QuestionSuggestion = () => {
  const { classes } = suggestionStyles();
  const [value, setValue] = useState<string | null>(null);
  const careerPathId = useAppSelector(selectSelectedCareerPathId);
  const selectedQuestion = useAppSelector(selectSelectedQuestion);
  const [getSuggestion, { data: suggestion, isLoading: suggestionLoading }] =
    useGetSuggestionMutation();

  useEffect(() => {
    if (!selectedQuestion || !value) {
      return;
    }
    getSuggestion({ question: selectedQuestion.question, careerPathId });
  }, [value, selectedQuestion]);

  useEffect(() => {
    setValue(null);
  }, [selectedQuestion, careerPathId]);

  return (
    <Paper h="auto" withBorder shadow="md">
      <Accordion value={value} onChange={setValue}>
        <Accordion.Item value="suggestion">
          <Accordion.Control>Show Suggestion</Accordion.Control>
          <Accordion.Panel className={classNames({ [classes.loader]: suggestionLoading })}>
            {suggestionLoading ? (
              <Loader />
            ) : (
              suggestion && (
                <div className={classes.container}>
                  <SuggestedFormat suggestedFormat={suggestion?.suggestedFormat} />
                  <TextBlock title="Sample Answer" content={suggestion?.sampleAnswer} />
                  <TextBlock title="Reasoning" content={suggestion?.whySuitable} />
                </div>
              )
            )}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Paper>
  );
};
