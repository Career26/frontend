import { Card, Text } from '@mantine/core';

import { getGradient, getGradientLabel, getYLabel } from './progressionUtil';

import type { SalaryProgression } from '@datatypes/overview';

import commonStyles from '@shared/styles/commonStyles.module.css';

type SalaryCardProps = {
  startingMin?: number;
  startingMax?: number;
  finalMax?: number;
  salaryProgression: SalaryProgression[];
};

export const SalaryCard = ({
  startingMin,
  startingMax,
  finalMax,
  salaryProgression,
}: SalaryCardProps) => (
  <Card padding="lg" radius="md" withBorder>
    <Card.Section withBorder inheritPadding py="xs">
      <div className={commonStyles.row}>
        <Text fw="bold">Starting Salary: </Text>
        <Text>
          {getYLabel(startingMin)} - {getYLabel(startingMax)}
        </Text>
      </div>
      <div className={commonStyles.row}>
        <Text fw="bold">Salary Increase: </Text>
        <Text>
          {getGradientLabel(getGradient({ max: finalMax, min: startingMax, salaryProgression }))} -{' '}
          {getGradientLabel(getGradient({ max: startingMax, min: startingMin, salaryProgression }))}
        </Text>
      </div>
    </Card.Section>
  </Card>
);
