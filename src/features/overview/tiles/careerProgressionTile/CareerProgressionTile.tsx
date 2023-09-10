import { PromotionTimeline, SalaryProgression } from '@datatypes/overview';
import { Badge, Card, Stepper, createStyles, rem } from '@mantine/core';
import React, { useMemo, useState } from 'react';
import { IconEye } from '@tabler/icons-react';
import classNames from 'classnames';

import { SalaryChart } from './SalaryChart';
import { getGradient, getGradientLabel, getSelectedItem, getYLabel } from './progressionUtil';

type CareerProgressionTileProps = {
  promotionTimeline: PromotionTimeline[];
  salaryProgression: SalaryProgression[];
};

const careerProgressionStyles = createStyles((theme) => ({
  container: {
    width: '20%',
  },
  cardContainer: {
    height: '50%',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: rem(10),
    background: theme.colors.blue[4],
    color: 'white',
  },
  cardBody: {
    paddingTop: rem(10),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: rem(20),
  },
  active: {
    background: theme.colors.pink[3],
    color: 'white',
  },
}));

const SalaryCard = ({
  header,
  active,
  startingMin,
  startingMax,
  finalMax,
  salaryProgression,
}: {
  header: string;
  active?: boolean;
  startingMin?: number;
  startingMax?: number;
  finalMax?: number;
  salaryProgression: CareerProgressionTileProps['salaryProgression'];
}) => {
  const { classes } = careerProgressionStyles();
  const color = active ? 'pink' : 'blue';
  return (
    <Card className={classes.cardContainer}>
      <Card.Section
        withBorder
        className={classNames(classes.cardHeader, { [classes.active]: active })}
      >
        {header}
      </Card.Section>
      <div className={classes.cardBody}>
        <Badge size="lg" color={color}>
          Starting Salary: {getYLabel(startingMin)} - {getYLabel(startingMax)}
        </Badge>
        <Badge size="lg" color={color}>
          Salary Increase:{' '}
          {getGradientLabel(getGradient({ max: finalMax, min: startingMax, salaryProgression }))} -{' '}
          {getGradientLabel(getGradient({ max: startingMax, min: startingMin, salaryProgression }))}
        </Badge>
      </div>
    </Card>
  );
};

export const CareerProgressionTile = ({
  promotionTimeline,
  salaryProgression,
}: CareerProgressionTileProps) => {
  const { classes } = careerProgressionStyles();
  const [activeIndex, setActiveIndex] = useState<number>();
  const [finalMax] = salaryProgression[salaryProgression.length - 1].value;
  const [startingMax, startingMin] = salaryProgression[0].value;

  const selectedItem = useMemo(
    () => getSelectedItem({ promotionTimeline, salaryProgression, activeIndex }),
    [activeIndex],
  );

  return (
    <>
      <Card className={classes.container}>
        <Stepper
          onStepClick={setActiveIndex}
          active={promotionTimeline.length}
          breakpoint="lg"
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: rem(20) }}>
        <SalaryCard
          header="Expected Salaries"
          finalMax={finalMax}
          startingMax={startingMax}
          startingMin={startingMin}
          salaryProgression={salaryProgression}
        />
        {selectedItem && (
          <SalaryCard
            header={selectedItem.title}
            salaryProgression={salaryProgression}
            active
            {...selectedItem}
          />
        )}
      </div>
    </>
  );
};
