import { Card, Text } from '@mantine/core';
import React from 'react';
import classNames from 'classnames';
import { CardInformation } from './choiceRefinementTypes';

import './choiceRefinement.scss';

type RefinementCardProps = CardInformation & {
  onClick: () => void;
  selected: boolean;
};

export const RefinementCard = ({ header, info, onClick, selected }: RefinementCardProps) => (
  <Card className={classNames('refinementCard', { selected })} shadow="xs" onClick={onClick}>
    <Text fw={700} size="md">
      {header}
    </Text>
    <Text fs="italic" size="xs" lineClamp={3}>
      {info}
    </Text>
  </Card>
);
