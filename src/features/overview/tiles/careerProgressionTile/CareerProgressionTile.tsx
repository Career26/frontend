import { PromotionTimeline, SalaryProgression } from '@datatypes/overview';
import { Card, Divider, Stepper } from '@mantine/core';
import React, { useMemo, useState } from 'react';
import { IconEye } from '@tabler/icons-react';
import { TextCard } from '@shared/components/cards/TextCard';

import { SalaryChart } from './SalaryChart';
import { getGradient, getGradientLabel, getSelectedItem, getYLabel } from './progressionUtil';
import styles from './careerProgressionStyles.module.scss';

type CareerProgressionTileProps = {
  promotionTimeline: PromotionTimeline[];
  salaryProgression: SalaryProgression[];
};

const SalaryCard = ({
  startingMin,
  startingMax,
  finalMax,
  salaryProgression,
}: {
  startingMin?: number;
  startingMax?: number;
  finalMax?: number;
  salaryProgression: CareerProgressionTileProps['salaryProgression'];
}) => (
  <div className={styles.cardContainer}>
    <TextCard
      content={
        <>
          Starting Salary: {getYLabel(startingMin)} - {getYLabel(startingMax)}
          <Divider className={styles.divider} />
          Salary Increase:{' '}
          {getGradientLabel(
            getGradient({ max: finalMax, min: startingMax, salaryProgression }),
          )} -{' '}
          {getGradientLabel(getGradient({ max: startingMax, min: startingMin, salaryProgression }))}
        </>
      }
    />
  </div>
);

export const CareerProgressionTile = ({
  promotionTimeline,
  salaryProgression,
}: CareerProgressionTileProps) => {
  const [activeIndex, setActiveIndex] = useState<number>();

  const selectedItem = useMemo(
    () => getSelectedItem({ promotionTimeline, salaryProgression, activeIndex }),
    [activeIndex],
  );

  return (
    <div id="progression">
      <Card className={styles.container} shadow="md" withBorder>
        <Stepper
          onStepClick={setActiveIndex}
          active={promotionTimeline.length}
          orientation="vertical"
          completedIcon={<IconEye size="1rem" />}
        >
          {promotionTimeline.map((item, index) => (
            <Stepper.Step
              icon={<IconEye size="1rem" />}
              key={`promotion-${item.age}`}
              label={item.age}
              description={item.title}
              color={activeIndex === index ? '#faa2c1' : '#228be6'}
            />
          ))}
        </Stepper>
      </Card>
      <SalaryChart
        salaryProgression={salaryProgression}
        maxAge={selectedItem?.maxAge}
        minAge={selectedItem?.minAge}
      />

      {selectedItem && <SalaryCard salaryProgression={salaryProgression} {...selectedItem} />}
    </div>
  );
};
