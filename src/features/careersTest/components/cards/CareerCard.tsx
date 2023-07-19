import React from 'react';
import classNames from 'classnames';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Factory from '@mui/icons-material/Factory';
import Info from '@mui/icons-material/Info';
import Lock from '@mui/icons-material/Lock';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Overlay } from '@mantine/core';
import { CardInformation } from '@careersTest/types/careersTestTypes';

import './cardStyles.scss';

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
  <Card onClick={onClick} className={classNames('card', { selected })}>
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
