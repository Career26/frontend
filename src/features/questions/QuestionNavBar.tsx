import { NavLink } from '@mantine/core';

import classNames from 'classnames';

import { useMobileStyles } from '@shared/hooks/useMobileStyles';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';

import type { Question } from '@datatypes/question';

import commonStlyes from '@shared/styles/commonStyles.module.css';

interface QuestionNavBarProps {
  questions?: Question[];
  selectedQuestionId: number;
}

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
