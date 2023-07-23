import React from 'react';
import classNames from 'classnames';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CardContent from '@mui/material/CardContent';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Factory from '@mui/icons-material/Factory';
import Info from '@mui/icons-material/Info';
import Lock from '@mui/icons-material/Lock';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Overlay } from '@mantine/core';
import { CardInformation } from '@careersTest/types/careersTestTypes';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './cardStyles.scss';
import { Collapse } from '@mui/material';
import { AddCircleRounded, TaskAlt } from '@mui/icons-material';

type RefinementCardProps = CardInformation & {
  onClick?: () => void;
  selected?: boolean;
  locked?: boolean;
  companies: string[];
  onClickRemove?: () => void;
  onClickAdd?: () => void;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
}: RefinementCardProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classNames('card', { selected })}>
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
      <CardActions>
        Find out more about this role
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div>
            <Info />
            About the role: {role}
          </div>
          <div>
            <QuestionMark />
            Why we think this is a good fit: {reason}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};
