import {
  AreasOfInterestValues,
  CompanyFormValues,
  EducationFormValues,
  PreviousExperienceFormValues,
  UniversityFormValues,
} from '@careersTest/types/careersFormTypes';

export const initialUniversityFormValues: UniversityFormValues = {
  degreeName: '',
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

export const initialAreasOfInterestValues: AreasOfInterestValues = {
  areasOfInterest: [],
};

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
