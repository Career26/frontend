import { PromotionTimeline, SalaryProgression } from '@datatypes/overview';
import { Group, Stepper } from '@mantine/core';
import React, { useMemo, useState } from 'react';
import { IconEye } from '@tabler/icons-react';
import commonStyles from '@shared/styles/commonStyles.module.scss';

import { SalaryChart } from './SalaryChart';
import { getSelectedItem } from './progressionUtil';
import { SalaryCard } from './SalaryCard';

type CareerProgressionTileProps = {
  promotionTimeline: PromotionTimeline[];
  salaryProgression: SalaryProgression[];
};

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
      <div className={commonStyles.row}>
        <Group py="md">
          <Stepper
            iconSize={32}
            orientation="vertical"
            onStepClick={setActiveIndex}
            active={promotionTimeline.length}
            completedIcon={<IconEye />}
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
        </Group>

        <SalaryChart
          salaryProgression={salaryProgression}
          maxAge={selectedItem?.maxAge}
          minAge={selectedItem?.minAge}
        />
      </div>

      {selectedItem && <SalaryCard salaryProgression={salaryProgression} {...selectedItem} />}
    </div>
  );
};
