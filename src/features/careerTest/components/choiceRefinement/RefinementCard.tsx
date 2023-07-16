import { ActionIcon, Card, Indicator, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import React from 'react';

type RefinementCardProps = {
  header: string;
  info: string;
};

export const RefinementCard = ({ header, info }: RefinementCardProps) => {
  const onClick = (e: any) => {
    console.log(e);
  };
  return (
    // <Indicator
    //   color="none"
    //   onClickCapture={(e) => console.log(e)}
    //   key={header}
    //   label={
    //     <ActionIcon onClick={onClick} color="red" variant="transparent" size="xs">
    //       <IconTrash />
    //     </ActionIcon>
    //   }
    // >
    <Card
      onClick={onClick}
      shadow="xs"
      padding="sm"
      style={{ marginLeft: '12px', maxWidth: 'auto' }}
    >
      <Text fw={700} size="md">
        {header}
      </Text>
      <Text fs="italic" size="xs" lineClamp={3}>
        {info}
      </Text>
    </Card>
    // </Indicator>
  );
};
