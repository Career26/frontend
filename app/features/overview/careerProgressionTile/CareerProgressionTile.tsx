import { Group, Stepper } from '@mantine/core';
import { useMemo, useState } from 'react';
import { IconEye } from '@tabler/icons-react';

import { SalaryChart } from './SalaryChart';
import { SalaryCard } from './SalaryCard';

import { getSelectedItem } from './progressionUtil';

import type { PromotionTimeline, SalaryProgression } from '@datatypes/overview';

import commonStyles from '@shared/styles/commonStyles.module.css';

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
                color={activeIndex === index ? '#faa2c1' : 'navy'}
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
