import React from 'react';
import classNames from 'classnames';
import { Card, CardActionArea, CardContent, Divider } from '@mui/material';
import { AttachMoney, Factory, Info, Lock, QuestionMark } from '@mui/icons-material';
import { Overlay } from '@mantine/core';

import { CardInformation } from '../../careersTestTypes';

import './careerCard.scss';

type RefinementCardProps = CardInformation & {
  onClick?: () => void;
  selected?: boolean;
  locked?: boolean;
};

export const CareerCard = ({
  jobTitle,
  info,
  salary,
  reason,
  onClick,
  selected,
  industry,
  locked,
}: RefinementCardProps) => (
  <Card onClick={onClick} className={classNames('careerCard', { selected })}>
    <CardActionArea>
      <CardContent>
        {locked && (
          <Overlay blur={8} center style={{ backgroundColor: 'unset' }}>
            <Lock />
          </Overlay>
        )}
        <div className="cardHeader">{jobTitle}</div>
        <Divider />
        <div>
          <AttachMoney />
          Salary: {salary}
        </div>
        <div>
          <Factory />
          Industry: {industry}
        </div>
        <div>
          <Info />
          Info: {info}
        </div>
        <div>
          <QuestionMark />
          Reason: {reason}
        </div>
      </CardContent>
    </CardActionArea>
  </Card>
);
