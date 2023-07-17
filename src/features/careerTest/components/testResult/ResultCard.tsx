import { Card, Overlay, Text } from '@mantine/core';
import React from 'react';
import { IconLock } from '@tabler/icons-react';

import './testResult.scss';

type ResultCardProps = {
  header: string;
  info: string;
  reason: string;
  salary: string;
  disabled?: boolean;
};

export const ResultCard = ({ header, info, reason, disabled, salary }: ResultCardProps) => (
  <Card shadow="xs" className="resultCard">
    {disabled && (
      <Overlay blur={8} center style={{ backgroundColor: 'unset' }}>
        <IconLock />
      </Overlay>
    )}
    <div className="topRow">
      <div>
        <Text fw={700} size="md">
          {header}
        </Text>
        <Text fs="italic" size="xs">
          {info}
        </Text>
      </div>
      <div>
        <Text fw={700} size="md">
          Why we think this is a good fit for you?
        </Text>
        <Text fs="italic" size="xs">
          {reason}
        </Text>
      </div>
    </div>
    <div className="topRow">
      <Text size="sm" fs="italic" fw={700}>
        Salary Expectations: {salary}
      </Text>
    </div>
  </Card>
);
