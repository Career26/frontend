import { Question } from '@datatypes/question';
import { AppShell, Button, ScrollArea } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { navStyles } from '@shared/styles/navStyles';
import classNames from 'classnames';
import React from 'react';

import styles from './interviewStyles.module.scss';

type QuestionNavBarProps = {
  questions?: Question[];
  selectedQuestionId: number;
};

export const QuestionNavBar = ({ selectedQuestionId, questions }: QuestionNavBarProps) => {
  const { classes: navClasses } = navStyles();
  const { toggleQuestionId } = usePageNavigation();
  return (
    <AppShell.Navbar p="xs" className={navClasses.navBar}>
      <AppShell.Section grow mt="md" className={navClasses.navLink}>
        <ScrollArea h="80vh">
          {questions?.map((_, index) => (
            <Button
              onClick={() => toggleQuestionId(index)}
              key={`question-${index}`}
              className={classNames(navClasses.navButton, navClasses.linkAction, {
                [navClasses.active]: selectedQuestionId === index,
              })}
            >
              <div className={styles.navButton}>Question {index + 1}</div>
            </Button>
          ))}
        </ScrollArea>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};
