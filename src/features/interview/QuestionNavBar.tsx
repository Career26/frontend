import { Question } from '@datatypes/question';
import { Button, ScrollArea } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import navStyles from '@shared/styles/navStyles.module.scss';
import classNames from 'classnames';
import React from 'react';

import styles from './interviewStyles.module.scss';

type QuestionNavBarProps = {
  questions?: Question[];
  selectedQuestionId: number;
};

export const QuestionNavBar = ({ selectedQuestionId, questions }: QuestionNavBarProps) => {
  const { toggleQuestionId } = usePageNavigation();
  return (
    <ScrollArea h="80vh">
      {questions?.map((_, index) => (
        <Button
          onClick={() => toggleQuestionId(index)}
          key={`question-${index}`}
          className={classNames(navStyles.navButton, navStyles.linkAction, {
            [navStyles.active]: selectedQuestionId === index,
          })}
        >
          <div className={styles.navButton}>Question {index + 1}</div>
        </Button>
      ))}
    </ScrollArea>
  );
};
