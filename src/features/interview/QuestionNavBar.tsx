import { Question } from '@datatypes/question';
import { NavLink } from '@mantine/core';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import React from 'react';

type QuestionNavBarProps = {
  questions?: Question[];
  selectedQuestionId: number;
};

export const QuestionNavBar = ({ selectedQuestionId, questions }: QuestionNavBarProps) => {
  const { toggleQuestionId } = usePageNavigation();
  return questions?.map((_, index) => (
    <NavLink
      active={selectedQuestionId === index}
      onClick={() => toggleQuestionId(index)}
      key={`question-${index}`}
      label={`Question ${index + 1}`}
    />
  ));
};
