import { SalaryProgression } from '@datatypes/overview';

export const getYLabel = (salary: number) => `£${salary / 1000}K`;

export const getGradientLabel = (gradient: number) => `£${gradient} / year`;

export const getGradient = (max: number, min: number, salaryProgression: SalaryProgression[]) => {
  const maxAge = Number(salaryProgression[salaryProgression.length - 1].age);
  const minAge = Number(salaryProgression[0].age);
  const years = maxAge - minAge;
  return (max - min) / years;
};
