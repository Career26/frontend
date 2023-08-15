import {
  DegreeGrade,
  DegreeLevel,
  ProfileInput,
  University,
  WorkExperienceInput,
  WorkType,
} from '@shared/types/careerTestTypes';

export const initialUniversityValues: University = {
  grade: DegreeGrade.FIRST,
  level: DegreeLevel.BA,
  name: '',
  university: '',
};

export const initialWorkExperienceValues: WorkExperienceInput = {
  companyName: '',
  rating: 5,
  ratingReason: '',
  role: '',
};

export const initialProfileValues: ProfileInput = {
  additionalDegrees: [],
  areasOfInterest: [],
  expectedSalary: { baseCurrency: 'GBP', city: 'London', expectedSalary: 40000 },
  personalityType: { workLifeBalanceSacrifice: false, workStyle: WorkType.GROUP },
  latestDegree: initialUniversityValues,
  previousWorkExperience: [initialWorkExperienceValues],
  fullName: 'Test Student',
};
