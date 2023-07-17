import { CareersTestFormValues } from '../careersTestTypes';

export const initialCareersFormValues: CareersTestFormValues = {
  firstName: '',
  lastName: '',
  latestDegree: {
    name: '',
    university: '',
    grade: '',
    is_predicted_grade: false,
    level: '',
  },
  additionalDegrees: [],
};
