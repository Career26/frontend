import { Text, createStyles, rem } from '@mantine/core';
import React from 'react';

const ratingStyles = createStyles({
  textIcon: {
    display: 'flex',
    gap: rem(10),
  },
});

export const TextWithIconBlock = ({
  title,
  content,
  Icon,
}: {
  title: string;
  content: React.ReactNode;
  Icon: React.ReactNode;
}) => {
  const { classes } = ratingStyles();
  return (
    <div>
      <div className={classes.textIcon}>
        {Icon}
        <Text weight="bold">{title}</Text>
      </div>
      {content}
    </div>
  );
};
