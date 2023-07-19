import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import classNames from 'classnames';
import CardActionArea from '@mui/material/CardActionArea';

import './cardStyles.scss';

type InterestCardProps = {
  name: string;
  selected?: boolean;
  onClick: () => void;
};

export const InterestCard = ({ name, onClick, selected }: InterestCardProps) => (
  <Card onClick={onClick} className={classNames('card', { selected })}>
    <CardActionArea>
      <CardContent>
        <div className="cardHeader">{name}</div>
      </CardContent>
    </CardActionArea>
  </Card>
);
