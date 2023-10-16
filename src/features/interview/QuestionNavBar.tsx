import { Question } from '@datatypes/interview';
import { Button, Navbar, ScrollArea, createStyles, rem } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { navStyles } from '@shared/styles/navStyles';
import classNames from 'classnames';
import React from 'react';

type QuestionNavBarProps = {
  questions?: Question[];
  selectedQuestionId: number;
};

const questionBarStyles = createStyles({
  button: {
    display: 'flex',
    flexDirection: 'column',
    gap: rem(5),
    justifyContent: 'flex-start',
  },
});

export const QuestionNavBar = ({ selectedQuestionId, questions }: QuestionNavBarProps) => {
  const { classes: navClasses } = navStyles();
  const { classes } = questionBarStyles();
  const { toggleQuestionId } = usePageNavigation();
  return (
    <Navbar p="xs" className={navClasses.navBar}>
      <Navbar.Section grow mt="md" className={navClasses.navLink}>
        <ScrollArea h="80vh">
          {questions?.map((_, index) => (
            <Button
              onClick={() => toggleQuestionId(index)}
              key={`question-${index}`}
              className={classNames(navClasses.navButton, navClasses.linkAction, {
                [navClasses.active]: selectedQuestionId === index,
              })}
            >
              <div className={classes.button}>Question {index + 1}</div>
            </Button>
          ))}
        </ScrollArea>
      </Navbar.Section>
    </Navbar>
  );
};
