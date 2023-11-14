import { Question } from '@datatypes/question';
import { NavLink } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import React from 'react';
import commonStlyes from '@shared/styles/commonStyles.module.scss';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';
import classNames from 'classnames';

type QuestionNavBarProps = {
  questions?: Question[];
  selectedQuestionId: number;
};

export const QuestionNavBar = ({ selectedQuestionId, questions }: QuestionNavBarProps) => {
  const { toggleQuestionId } = usePageNavigation();
  const { isMobile } = useMobileStyles();
  return questions?.map(({ question }, index) => (
    <NavLink
      className={classNames({ [commonStlyes.mobileNavbar]: isMobile })}
      active={selectedQuestionId === index}
      onClick={() => toggleQuestionId(index)}
      key={`question-${index}`}
      label={`${index + 1}. ${question}`}
    />
  ));
};
