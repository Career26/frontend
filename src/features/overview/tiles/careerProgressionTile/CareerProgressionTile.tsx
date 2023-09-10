import { PromotionTimeline, SalaryProgression } from '@datatypes/overview';
import { Badge, Card, Stepper, createStyles, rem } from '@mantine/core';
import React, { ReactNode, useMemo, useState } from 'react';
import { IconEye } from '@tabler/icons-react';
import classNames from 'classnames';

import { SalaryChart } from './SalaryChart';
import { getGradient, getGradientLabel, getYLabel } from '../salaryTile/salaryUtil';

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
  children,
}: {
  header: string;
  children: ReactNode;
  active?: boolean;
}) => {
  const { classes } = careerProgressionStyles();
  return (
    <Card className={classes.cardContainer}>
      <Card.Section
        withBorder
        className={classNames(classes.cardHeader, { [classes.active]: active })}
      >
        {header}
      </Card.Section>
      <div className={classes.cardBody}>{children}</div>
    </Card>
  );
};

const getSelectedItem = (
  promotionTimeline: PromotionTimeline[],
  salaryProgression: SalaryProgression[],
  activeIndex?: number,
) => {
  if (activeIndex === undefined) {
    return null;
  }
  const { title, age } = promotionTimeline[activeIndex];
  const [minAge, maxAge] = age.split('-');
  const minSalary = salaryProgression.find((item) => item.age === minAge);
  const maxSalary = salaryProgression.find((item) => item.age === maxAge);
  return {
    startingMin: minSalary?.value?.[1],
    startingMax: minSalary?.value?.[0],
    finalMin: maxSalary?.value?.[1],
    finalMax: maxSalary?.value?.[0],
    title,
    minAge,
    maxAge,
  };
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
    () => getSelectedItem(promotionTimeline, salaryProgression, activeIndex),
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
        <SalaryCard header="Expected Salaries">
          <Badge size="lg">
            Starting Salary: {getYLabel(startingMin)} - {getYLabel(startingMax)}
          </Badge>
          <Badge size="lg">
            Salary Increase:{' '}
            {getGradientLabel(getGradient(finalMax, startingMax, salaryProgression))} -{' '}
            {getGradientLabel(getGradient(startingMax, startingMin, salaryProgression))}
          </Badge>
        </SalaryCard>
        {selectedItem && (
          <SalaryCard header={selectedItem.title} active>
            <Badge size="lg" color="pink">
              Starting Salary: {getYLabel(selectedItem.startingMin)} -{' '}
              {getYLabel(selectedItem.startingMax)}
            </Badge>
            <Badge size="lg" color="pink">
              Salary Increase:{' '}
              {getGradientLabel(
                getGradient(selectedItem.finalMax, selectedItem.startingMax, salaryProgression),
              )}{' '}
              -{' '}
              {getGradientLabel(
                getGradient(selectedItem.startingMax, selectedItem.startingMin, salaryProgression),
              )}
            </Badge>
          </SalaryCard>
        )}
      </div>
    </>
  );
};
