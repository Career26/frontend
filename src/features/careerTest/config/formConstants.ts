import { CareerFormValues } from '@careerTest/careerTestTypes';
import { DegreeGrade, DegreeLevel, Degree, WorkExperience, WorkStyle } from '@datatypes/profile';
import { IconCurrencyDollar, IconCurrencyPound, IconCurrencyYen } from '@tabler/icons-react';

export const exampleCities = [
  { value: 'London', label: 'London', baseCurrency: 'GBP', Icon: IconCurrencyPound },
  { value: 'New York', label: 'New York', baseCurrency: 'USD', Icon: IconCurrencyDollar },
  { value: 'Tokyo', label: 'Tokyo', baseCurrency: 'JPY', Icon: IconCurrencyYen },
  { value: 'Sydney', label: 'Sydney', baseCurrency: 'AUD', Icon: IconCurrencyDollar },
  { value: 'Hong Kong', label: 'Hong Kong', baseCurrency: 'HKD', Icon: IconCurrencyDollar },
  { value: 'Shanghai', label: 'Shanghai', baseCurrency: 'RMB', Icon: IconCurrencyYen },
];

export const exampleAreasOfInterest = [
  'Finance',
  'Business',
  'Law',
  'Consulting',
  'Education',
  'Technology',
  'Healthcare',
  'Charity',
  'Art and Creative Work',
  'Politics',
  'Public Services',
  'Academia / Research',
];

export const initialUniversityValues: Degree = {
  grade: DegreeGrade.FIRST,
  level: DegreeLevel.BA,
  name: '',
  university: '',
  isPredictedGrade: false,
};

export const initialWorkExperienceValues: WorkExperience = {
  companyName: '',
  rating: 0,
  ratingReason: '',
  role: '',
};

export const initialProfileValues: CareerFormValues = {
  additionalDegrees: [],
  areasOfInterest: [],
  expectedSalary: { baseCurrency: 'GBP', city: 'London', expectedSalary: 40000 },
  personalityType: { workLifeBalanceSacrifice: false, workStyle: WorkStyle.Team },
  latestDegree: initialUniversityValues,
  previousWorkExperience: [initialWorkExperienceValues],
  fullName: 'Test Student',
};
