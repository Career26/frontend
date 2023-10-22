import { CareerFormValues } from '@careerTest/careerTestTypes';
import { Degree, WorkExperience, WorkStyle } from '@datatypes/profile';
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

export const ratingOptions = [
  'I hated it',
  'I disliked it',
  'I neither liked or disliked it',
  'I liked it',
  'I loved it',
];

export const ukDegreeGrades = [
  'First Class (1st)',
  'Second Class Upper (2:1)',
  'Second Class Lower (2:2)',
  'Third Class (3rd)',
  'Pass',
];

export const usDegreeGrades = [
  'GPA 3.8 - 4.0',
  'GPA 3.3 - 3.7',
  'GPA 2.7 - 3.2',
  'GPA 2.0 - 2.6',
  'GPA 1.0 - 1.9',
];

export const degreeLevels = ['PhD', 'MSc', 'MA', 'BSc', 'BA', 'MEng', 'BEng'];

export const degreeOptions = [
  ...ukDegreeGrades.map((label) => ({ label, value: label, group: 'UK Grading' })),
  ...usDegreeGrades.map((label) => ({ label, value: label, group: 'US Grading' })),
];

export const initialUniversityValues: Degree = {
  grade: '',
  level: '',
  name: '',
  university: '',
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
};
