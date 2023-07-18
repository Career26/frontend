import { CareersTestFormValues, UniversityFormValues } from '../careersTestTypes';

export const initialUniversityFormValues: UniversityFormValues = {
  degreeName: '',
  universityName: '',
  degreeLevel: '',
  isPredicted: false,
  degreeGrade: '',
};

export const initialCareersFormValues: CareersTestFormValues = {
  firstName: '',
  lastName: '',
  latestDegree: { ...initialUniversityFormValues },
  additionalDegrees: [],
};
