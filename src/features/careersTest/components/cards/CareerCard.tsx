import React from 'react';
import classNames from 'classnames';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Factory from '@mui/icons-material/Factory';
import Lock from '@mui/icons-material/Lock';
import { Loader, Overlay } from '@mantine/core';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { CareerCardHeader } from './CareerCardHeader';
import { CareerCardFooter } from './CareerCardFooter';

import './cardStyles.scss';
import { CardHeader, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

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
  loading?: boolean;
};

export const CareerCard = ({
  jobTitle,
  role,
  salary,
  reason,
  onClickRemove,
  selected,
  industry,
  companies,
  locked,
  loading,
}: RefinementCardProps) => (
  <Card className={classNames('card', { selected })}>
    {loading ? (
      <Loader />
    ) : (
      <>
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
      </>
    )}
  </Card>
);
