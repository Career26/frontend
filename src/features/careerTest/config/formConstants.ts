import { CareerFormValues } from '@careerTest/careerTestTypes';
import { DegreeGrade, DegreeLevel, Degree, WorkExperience, WorkStyle } from '@datatypes/profile';

export const exampleCities = [
  { value: 'London', label: 'London', baseCurrency: 'GBP', symbol: '£' },
  { value: 'New York', label: 'New York', baseCurrency: 'USD', symbol: '$' },
  { value: 'Tokyo', label: 'Tokyo', baseCurrency: 'JPY', symbol: '¥' },
  { value: 'Sydney', label: 'Sydney', baseCurrency: 'AUD', symbol: '$' },
  { value: 'Hong Kong', label: 'Hong Kong', baseCurrency: 'HKD', symbol: '$' },
  { value: 'Shanghai', label: 'Shanghai', baseCurrency: 'RMB', symbol: '¥' },
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
  rating: 5,
  ratingReason: '',
  role: '',
};

export const initialProfileValues: CareerFormValues = {
  additionalDegrees: [],
  areasOfInterest: [],
  expectedSalary: { baseCurrency: 'GBP', city: 'London', expectedSalary: 40000 },
  personalityType: { workLifeBalanceSacrifice: false, workStyle: WorkStyle.GROUP },
  latestDegree: initialUniversityValues,
  previousWorkExperience: [initialWorkExperienceValues],
  fullName: 'Test Student',
};
