import React from 'react';
import classNames from 'classnames';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Factory from '@mui/icons-material/Factory';
import Lock from '@mui/icons-material/Lock';
import { Overlay } from '@mantine/core';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { CareerCardHeader } from './CareerCardHeader';
import { CareerCardFooter } from './CareerCardFooter';

import './cardStyles.scss';

type RefinementCardProps = {
  jobTitle: string;
  role: string;
  industry: string;
  reason: string;
  id: string;
  salary: string;
  companies: string[];
  selected: boolean;
  locked?: boolean;
  onClickRemove: () => void;
  onClickAdd: () => void;
};

export const CareerCard = ({
  jobTitle,
  role,
  salary,
  reason,
  onClickAdd,
  onClickRemove,
  selected,
  industry,
  companies,
  locked,
}: RefinementCardProps) => (
  <Card className={classNames('card', { selected })}>
    <CareerCardHeader
      jobTitle={jobTitle}
      onClickAdd={onClickAdd}
      onClickRemove={onClickRemove}
      selected={selected}
    />
    <CardContent>
      {locked && (
        <Overlay blur={8} center style={{ backgroundColor: 'unset' }}>
          <Lock />
        </Overlay>
      )}
      <div>
        <AttachMoney />
        Salary range: {salary}
      </div>
      <div>
        <Factory />
        Industry: {industry}
      </div>
      <div>
        <AccountBalanceIcon />
        Example Companies: {companies.join(', ')}
      </div>
    </CardContent>
    <CareerCardFooter role={role} reason={reason} />
  </Card>
);
