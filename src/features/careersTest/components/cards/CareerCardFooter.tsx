import React from 'react';
import CardContent from '@mui/material/CardContent';
import Info from '@mui/icons-material/Info';
import QuestionMark from '@mui/icons-material/QuestionMark';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import { AddCircleRounded } from '@mui/icons-material';

import { CareerCardHeader } from './CareerCardHeader';

import './cardStyles.scss';

type CareerCardFooterProps = {
  role: string;
  reason: string;
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

export const CareerCardFooter = ({ role, reason }: CareerCardFooterProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
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
    </>
  );
};
