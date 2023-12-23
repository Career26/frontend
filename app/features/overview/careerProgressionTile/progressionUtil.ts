import type { PromotionTimeline, SalaryProgression } from '@datatypes/overview';

export const getYLabel = (salary?: number) => (salary === undefined ? 'NA' : `£${salary / 1000}K`);

export const getGradientLabel = (gradient?: number) =>
  gradient === undefined ? 'NA' : `£${gradient}/yr`;

export const getVerticalFill = (
  salaryProgression: SalaryProgression[],
  minAge?: string,
  maxAge?: string,
) =>
  salaryProgression.map(({ age }) => {
    if (Number(age) >= Number(minAge) && Number(age) <= Number(maxAge)) {
      return 'pink';
    }
    return 'none';
  });

export const getGradient = ({
  max,
  min,
  salaryProgression,
}: {
  max?: number;
  min?: number;
  salaryProgression: SalaryProgression[];
}) => {
  if (!max || !min) {
    return undefined;
  }
  const maxAge = Number(salaryProgression[salaryProgression.length - 1].age);
  const minAge = Number(salaryProgression[0].age);
  const years = maxAge - minAge;
  return (max - min) / years;
};

export const getSelectedItem = ({
  promotionTimeline,
  salaryProgression,
  activeIndex,
}: {
  promotionTimeline: PromotionTimeline[];
  salaryProgression: SalaryProgression[];
  activeIndex?: number;
}) => {
  if (activeIndex === undefined) {
    return null;
  }
  const { title, age } = promotionTimeline[activeIndex];
  const [minAge, maxAge] = age.split('-');
  const minSalary = salaryProgression.find((item) => item.age === minAge);
  const maxSalary = salaryProgression.find((item) => item.age === maxAge);
  return {
    startingMin: minSalary?.low,
    startingMax: minSalary?.high,
    finalMin: maxSalary?.low,
    finalMax: maxSalary?.high,
    title,
    minAge,
    maxAge,
  };
};
