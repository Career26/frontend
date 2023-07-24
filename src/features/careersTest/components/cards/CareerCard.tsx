import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Factory from '@mui/icons-material/Factory';
import { Loader, Overlay } from '@mantine/core';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

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
  locked?: boolean;
  onClickRemove: () => void;
  loading?: boolean;
};

export const CareerCard = ({
  jobTitle,
  role,
  salary,
  reason,
  onClickRemove,
  industry,
  companies,
  loading,
}: RefinementCardProps) => {
  if (loading) {
    return <Loader />;
  }
  return (
    <Card className="card">
      <CardHeader
        title={jobTitle}
        action={
          <div className="headerButtons">
            <IconButton
              arial-label="remove-interest"
              onClick={onClickRemove}
              className="iconButtons"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </div>
        }
      />
      <CardContent>
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
};
