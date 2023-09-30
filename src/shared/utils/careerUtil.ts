import { careerColors } from '@shared/config/careerConstants';

export const getIndustryColors = ({
  initialColors,
  industries,
}: {
  initialColors: { [key: string]: string };
  industries: string[];
}) =>
  industries.reduce<{ [key: string]: string }>(
    (agg, industry) => {
      if (agg[industry]) {
        return agg;
      }
      const newColor = careerColors[Object.keys(agg).length];
      return { ...agg, [industry]: newColor };
    },
    { ...initialColors },
  );
