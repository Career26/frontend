import { selectSuggestion, useGetSuggestionMutation } from '@apis/questionsApi';
import { Accordion, Badge, List, Loader, Paper, ThemeIcon, createStyles, rem } from '@mantine/core';
import { selectSelectedCareerPathId, selectSelectedQuestion } from '@slices/sessionSlice';
import { useAppSelector } from '@state/store';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { IconBulb, IconQuestionMark, IconStar } from '@tabler/icons-react';

import { TextWithIconBlock } from './TextWithIconBlock';

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
    <List spacing="md" center className={classes.list}>
      {starMap ? <StarList starMap={starMap} /> : <NumberedList items={numberedItems} />}
    </List>
  );
};

export const QuestionSuggestion = () => {
  const { classes } = suggestionStyles();
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
                </div>
              )
            )}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Paper>
  );
};
