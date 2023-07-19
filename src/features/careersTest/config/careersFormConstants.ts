import {
  CompanyFormValues,
  EducationFormValues,
  PreviousExperienceFormValues,
  UniversityFormValues,
} from '../careersTestTypes';

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
