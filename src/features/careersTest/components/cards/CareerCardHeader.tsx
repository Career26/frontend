import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleRounded from '@mui/icons-material/AddCircleRounded';

import './cardStyles.scss';

type CareerCardHeaderProps = {
  selected: boolean;
  onClickRemove: () => void;
  onClickAdd: () => void;
  jobTitle: string;
};

const CareerCardActions = ({
  selected,
  onClickAdd,
  onClickRemove,
}: {
  selected?: boolean;
  onClickAdd?: () => void;
  onClickRemove?: () => void;
}) => {
  if (!selected) {
    return (
      <IconButton aria-label="add-interest" onClick={onClickAdd} className="iconButtons">
        <AddCircleRounded />
      </IconButton>
    );
  }
  return (
    <div className="headerButtons">
      <IconButton arial-label="remove-interest" onClick={onClickRemove} className="iconButtons">
        <RemoveCircleOutlineIcon />
      </IconButton>
      <IconButton aria-label="interest-added" className="iconButtons" disabled>
        <CheckCircleIcon color="success" />
      </IconButton>
    </div>
  );
};

export const CareerCardHeader = ({
  onClickAdd,
  onClickRemove,
  selected,
  jobTitle,
}: CareerCardHeaderProps) => (
  <CardHeader
    title={jobTitle}
    action={
      <CareerCardActions
        onClickAdd={onClickAdd}
        onClickRemove={onClickRemove}
        selected={selected}
      />
    }
  />
);
