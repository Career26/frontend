import { IconCurrencyDollar, IconCurrencyPound, IconCurrencyYen } from '@tabler/icons-react';

import { Degree, Experience, ExperienceType, WorkValue, WorkStyle } from '@datatypes/profile';
import type { CareerFormValues } from '@datatypes/careerTest';
import type { BasicDegree, BasicExperience } from '@datatypes/network';

export const exampleCities = [
  {
    value: 'London',
    label: 'London',
    baseCurrency: 'GBP',
    Icon: IconCurrencyPound,
  },
  {
    value: 'New York',
    label: 'New York',
    baseCurrency: 'USD',
    Icon: IconCurrencyDollar,
  },
  {
    value: 'Tokyo',
    label: 'Tokyo',
    baseCurrency: 'JPY',
    Icon: IconCurrencyYen,
  },
  {
    value: 'Sydney',
    label: 'Sydney',
    baseCurrency: 'AUD',
    Icon: IconCurrencyDollar,
  },
  {
    value: 'Hong Kong',
    label: 'Hong Kong',
    baseCurrency: 'HKD',
    Icon: IconCurrencyDollar,
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
    baseCurrency: 'RMB',
    Icon: IconCurrencyYen,
  },
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

export const experienceOptions = Object.entries(ExperienceType).map(([label, value]) => ({
  label,
  value,
}));

export const workStyleOptions = Object.entries(WorkStyle).map(([label, value]) => ({
  label,
  value,
}));

export const workLifeOptions = Object.entries(WorkValue).map(([label, value]) => ({
  label,
  value,
}));

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
];

export const usDegreeGrades = [
  'GPA 3.8 - 4.0',
  'GPA 3.3 - 3.7',
  'GPA 2.7 - 3.2',
  'GPA 2.0 - 2.6',
  'GPA 1.0 - 1.9',
];

export const otherGrades = ['Distinction', 'Merit', 'Pass', 'N/A'];

export const degreeLevels = ['PhD', 'MSc', 'MA', 'BSc', 'BA', 'MEng', 'BEng', 'MChem'];

export const degreeOptions = [
  { group: 'UK Grading', items: ukDegreeGrades },
  { group: 'US Grading', items: usDegreeGrades },
  { group: 'Other', items: otherGrades },
];

export const initiaBasiclUniversityValues: BasicDegree = {
  level: '',
  name: '',
  university: '',
};

export const initialUniversityValues: Degree = {
  ...initiaBasiclUniversityValues,
  grade: '',
  rating: '',
  ratingReason: '',
};

export const initialBasicWorkExperienceValues: BasicExperience = {
  experienceName: '',
  role: '',
};

export const initialWorkExperienceValues: Experience = {
  ...initialBasicWorkExperienceValues,
  experienceType: ExperienceType['Work Experience / Internship'],
  rating: '',
  ratingReason: '',
};

export const initialProfileValues: CareerFormValues = {
  additionalDegrees: [],
  areasOfInterest: [],
  expectedSalary: {
    baseCurrency: 'GBP',
    city: 'London',
    expectedSalary: 40000,
  },
  personalityType: {
    workValue: WorkValue['Higher salary'],
    workStyle: WorkStyle['I prefer working independently'],
  },
  latestDegree: initialUniversityValues,
  previousWorkExperience: [initialWorkExperienceValues],
  diversity: {
    firstGeneration: undefined,
    schoolType: undefined,
    ethnicity: undefined,
    gender: undefined,
    age: undefined,
  },
};

export const careerLoadingText = [
  'Generating your personalised career suggestions...',
  'This may take up to 30 seconds...',
  "You're almost there...",
];

export const smallAnswer = '(1 to 2 sentences)';
