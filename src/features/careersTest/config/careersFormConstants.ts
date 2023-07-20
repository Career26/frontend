import {
  AreasOfInterestFormValues,
  CompanyFormValues,
  EducationFormValues,
  PreviousExperienceFormValues,
  UniversityFormValues,
  WorkPreferencesFormValues,
} from '@careersTest/types/careersFormTypes';

export const degreeLevels = ['PhD', 'MSc', 'MA', 'BSc', 'BA'].map((value) => ({
  label: value,
  value,
}));

export const degreeGrades = [
  'First Class (1st)',
  'Second Class Upper (2:1)',
  'Second Class Lower (2:2)',
  'Third Class (3rd)',
  'Pass',
].map((value) => ({ label: value, value }));

export const workTypeOptions = [
  { label: 'Independent', value: 'INDEPENDENT' },
  { label: 'Group', value: 'Group' },
];

export const basicInterestsList = [
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

export const citiesList = [
  { value: 'LONDON', label: 'London', currency: 'GBP', symbol: '£' },
  { value: 'NEW_YORK', label: 'New York', currency: 'USD', symbol: '$' },
  { value: 'TOKYO', label: 'Tokyo', currency: 'JPY', symbol: '¥' },
  { value: 'SYDNEY', label: 'Sydney', currency: 'AUD', symbol: '$' },
  { value: 'HONG_KONG', label: 'Hong Kong', currency: 'HKD', symbol: '$' },
  { value: 'SHANGHAI', label: 'Shanghai', currency: 'RMB', symbol: '¥' },
];

export const initialUniversityFormValues: UniversityFormValues = {
  courseName: '',
  universityName: '',
  degreeLevel: '',
  isPredicted: false,
  degreeGrade: '',
};

export const initialEducationFormValues: EducationFormValues = {
  firstName: '',
  lastName: '',
  latestDegree: { ...initialUniversityFormValues },
  additionalDegrees: [],
};

export const initialCompanyFormValues: CompanyFormValues = {
  companyName: '',
  rating: 5,
  ratingReason: '',
  role: '',
};

export const initialPreviousExperienceFormValues: PreviousExperienceFormValues = {
  previousWorkExperience: [],
};

export const initialAreasOfInterestValues: AreasOfInterestFormValues = {
  areasOfInterest: [],
};

const initialCity = { ...citiesList[0] };
const initialWorkType = { ...workTypeOptions[0] };
export const initialWorkPreferencesValues: WorkPreferencesFormValues = {
  workStyle: initialWorkType.value,
  sacrificeWorkLifeBalance: false,
  enjoyTalkingToPeople: false,
  expectedSalary: {
    baseCurrency: initialCity.currency,
    symbol: initialCity.symbol,
    city: initialCity.value,
    expectedSalary: '30,000',
  },
};
